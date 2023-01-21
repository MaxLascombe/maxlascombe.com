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
            height: 70,
            velocity: {
                x: 0,
                y: 0,
            },
            position: {
                x: 50,
                y: 50,
            },
            width: 300,
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
                x: 50 + index * 50,
                y: 150,
            },
            width: 30,
        })),
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
