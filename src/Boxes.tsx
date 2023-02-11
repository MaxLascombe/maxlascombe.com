import { useState } from 'react'
import Box from './Box'
import Controls from './Controls'
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

        const smallScreen = window.innerWidth < 600

        const [controls, setControls] = useState({
                left: false,
                up: false,
                right: false,
                down: false,
        })

        const { boxes, acceleration } = useBoxesWithCollisions([
                {
                        key: 'player',
                        content: 'P',
                        link: '',
                        height: playerSize.height,
                        velocity: { x: 0, y: 0 },
                        position: { x: 50, y: 50 },
                        width: playerSize.width,
                },
                {
                        key: 'title',
                        content: (
                                <h1 className="lowercase">
                                        Max Lascombe dot com
                                </h1>
                        ),
                        link: '/',
                        height: 50,
                        velocity: {
                                x: 0,
                                y: 0,
                        },
                        position: {
                                x: window.innerWidth / 2 - 100,
                                y: 50 + (smallScreen ? 100 : 0),
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
                                        (Object.keys(socialLinks).length * 30) /
                                                2 -
                                        ((Object.keys(socialLinks).length - 1) *
                                                20) /
                                                2 +
                                        index * 50,
                                y: 130 + (smallScreen ? 100 : 0),
                        },
                        width: 30,
                })),
                {
                        key: 'newsletter',
                        content: 'my newsletter',
                        height: 40,
                        link: 'https://lifetothemax.substack.com/',
                        velocity: {
                                x: 0,
                                y: 0,
                        },
                        position: {
                                x: window.innerWidth / 2 - 75,
                                y: 190 + (smallScreen ? 100 : 0),
                        },
                        width: 150,
                },
        ])

        return (
                <div className="h-screen bg-black relative">
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
                        <Controls
                                leftPress={() =>
                                        setControls({ ...controls, left: true })
                                }
                                leftRelease={() =>
                                        setControls({
                                                ...controls,
                                                left: false,
                                        })
                                }
                                upPress={() =>
                                        setControls({ ...controls, up: true })
                                }
                                upRelease={() =>
                                        setControls({ ...controls, up: false })
                                }
                                rightPress={() =>
                                        setControls({
                                                ...controls,
                                                right: true,
                                        })
                                }
                                rightRelease={() =>
                                        setControls({
                                                ...controls,
                                                right: false,
                                        })
                                }
                                downPress={() =>
                                        setControls({ ...controls, down: true })
                                }
                                downRelease={() =>
                                        setControls({
                                                ...controls,
                                                down: false,
                                        })
                                }
                        />
                </div>
        )
}

export default Boxes
