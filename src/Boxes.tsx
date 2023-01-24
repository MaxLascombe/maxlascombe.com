import Box from './Box'
import Player from './Player'
import { useBoxesWithCollisions } from './hooks/useBoxesWithCollisions'

const Boxes = () => {
    const playerSize = { width: 30, height: 30 }

    const socialLinks = {
        fb: 'https://www.facebook.com/maxlascombe',
        tw: 'https://twitter.com/MaxLascombe',
        ig: 'https://www.instagram.com/maxlascombe/',
        li: 'https://www.linkedin.com/in/maxlascombe/',
        gh: 'https://github.com/MaxLascombe',
        yt: 'https://www.youtube.com/MaxLascombe',
    }

    const { boxes, acceleration } = useBoxesWithCollisions([
        {
            key: 'player',
            content: 'P',
            height: playerSize.height,
            velocity: { x: 0, y: 0 },
            position: { x: 500, y: 50 },
            width: playerSize.width,
        },
        {
            key: 'title',
            content: <h1 className="lowercase">Max Lascombe dot com</h1>,
            height: 50,
            velocity: {
                x: 0,
                y: 0,
            },
            position: {
                x: window.innerWidth / 2 - 100,
                y: 50,
            },
            width: 200,
        },
        ...Object.entries(socialLinks).map(([key, link], index) => ({
            key,
            content: key,
            height: 30,
            link,
            velocity: {
                x: 0,
                y: 0,
            },
            position: {
                x:
                    window.innerWidth / 2 -
                    (Object.keys(socialLinks).length * 30) / 2 -
                    ((Object.keys(socialLinks).length - 1) * 20) / 2 +
                    index * 50,
                y: 150,
            },
            width: 30,
        })),
        // {
        //     key: 'about',
        //     content: (
        //         <div className="text-left px-2">
        //             <h2 className="uppercase">About</h2>
        //             <p>
        //                 I'm a software engineer / creative person based in NYC.
        //                 I'm currently working at YouGov as Head of Development
        //                 for YouGov Finance after my co-founders and I sold our
        //                 startup Lean to YouGov. I have a newsletter where I
        //                 discuss my goals and how I'm working on achieving them.
        //             </p>
        //         </div>
        //     ),
        //     height: 200,
        //     velocity: {
        //         x: 0,
        //         y: 0,
        //     },
        //     position: {
        //         x: window.innerWidth / 2 - 200,
        //         y: 250,
        //     },
        //     width: 400,
        // },
        {
            key: 'newsletter',
            content: 'lifetothemax newsletter',
            height: 40,
            link: 'https://lifetothemax.substack.com/',
            velocity: {
                x: 0,
                y: 0,
            },
            position: {
                x: window.innerWidth / 2 - 100,
                y: 500,
            },
            width: 200,
        },
    ])

    return (
        <div className="relative">
            <Player
                {...{
                    acceleration,
                    position: boxes[0].position,
                    size: playerSize,
                    velocity: boxes[0].velocity,
                }}
            />
            {boxes.slice(1).map(box => (
                <Box {...box}>{box.content}</Box>
            ))}
        </div>
    )
}

export default Boxes
