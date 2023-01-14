import { useState } from 'react'

import Box from './Box'
import useAnimationFrame from './hooks/useAnimationFrame'
import useKeyAction from './hooks/useKeyAction'

type BoxData = {
    content: string
    height: number
    position: {
        x: number
        y: number
    }
    velocity: {
        x: number
        y: number
    }
    width: number
}

const dragCoefficient = 0.1

type PlayerProps = {
    position: {
        x: number
        y: number
    }
    size: {
        height: number
        width: number
    }
    velocity: {
        x: number
        y: number
    }
}

const Player = ({
    position: { x: left, y: top },
    size: { height, width },
    velocity,
}: PlayerProps) => {
    return (
        <div
            style={{ height, left, top, width }}
            className="absolute border-2 border-white rounded"></div>
    )
}

const Boxes = () => {
    // player position and velocity
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [velocity, setVelocity] = useState({ x: 10, y: 0 })

    const playerSize = { width: 20, height: 30 }
    const playerSpeed = 100

    useKeyAction(
        [
            [
                'ArrowUp',
                () => setVelocity(v => ({ ...v, y: -1 * playerSpeed })),
            ],
            ['ArrowDown', () => setVelocity(v => ({ ...v, y: playerSpeed }))],
            [
                'ArrowLeft',
                () => setVelocity(v => ({ ...v, x: -1 * playerSpeed })),
            ],
            ['ArrowRight', () => setVelocity(v => ({ ...v, x: playerSpeed }))],
        ],
        'keydown'
    )

    useKeyAction(
        [
            [
                'ArrowUp',
                () =>
                    setVelocity(v => ({
                        ...v,
                        y: v.y === -1 * playerSpeed ? 0 : v.y,
                    })),
            ],
            [
                'ArrowDown',
                () =>
                    setVelocity(v => ({
                        ...v,
                        y: v.y === playerSpeed ? 0 : v.y,
                    })),
            ],
            [
                'ArrowLeft',
                () =>
                    setVelocity(v => ({
                        ...v,
                        x: v.x === -1 * playerSpeed ? 0 : v.x,
                    })),
            ],
            [
                'ArrowRight',
                () =>
                    setVelocity(v => ({
                        ...v,
                        x: v.x === playerSpeed ? 0 : v.x,
                    })),
            ],
        ],
        'keyup'
    )

    const [boxes, setBoxes] = useState<BoxData[]>([
        {
            content: 'Box 1',
            height: 50,
            velocity: {
                x: 50,
                y: 30,
            },
            position: {
                x: 100,
                y: 0,
            },
            width: 100,
        },
        {
            content: 'Box 2',
            height: 50,
            velocity: {
                x: 200,
                y: 10,
            },
            position: {
                x: 300,
                y: 0,
            },
            width: 100,
        },
        {
            content: 'Box 3',
            height: 50,
            velocity: {
                x: 10,
                y: 110,
            },
            position: {
                x: 500,
                y: 100,
            },
            width: 100,
        },
    ])

    useAnimationFrame(
        dt => {
            setPosition(({ x: oldX, y: oldY }) => {
                let newPos = {
                    x: oldX + velocity.x * dt * 0.001,
                    y: oldY + velocity.y * dt * 0.001,
                }

                // collisions with boxes
                return newPos
            })

            setBoxes(boxes => {
                let newBoxes = [...boxes]
                newBoxes.forEach((box, index) => {
                    // update position based on veolicty
                    box.position.x += box.velocity.x * dt * 0.001
                    box.position.y += box.velocity.y * dt * 0.001

                    // collisions with walls
                    if (box.position.x < 0) {
                        box.position.x *= -1
                        box.velocity.x *= -1
                    }
                    if (box.position.x > window.innerWidth - box.width) {
                        box.position.x =
                            2 * (window.innerWidth - box.width) - box.position.x
                        box.velocity.x *= -1
                    }
                    if (box.position.y < 0) {
                        box.position.y *= -1
                        box.velocity.y *= -1
                    }
                    if (box.position.y > window.innerHeight - box.height) {
                        box.position.y =
                            2 * (window.innerHeight - box.height) -
                            box.position.y
                        box.velocity.y *= -1
                    }

                    // collisions with other boxes
                    for (let i = 0; i < index; i++) {
                        let otherBox = newBoxes[i]
                        // other box and box collided
                        if (
                            box.position.x <
                                otherBox.position.x + otherBox.width &&
                            box.position.x + box.width > otherBox.position.x &&
                            box.position.y <
                                otherBox.position.y + otherBox.height &&
                            box.position.y + box.height > otherBox.position.y
                        ) {
                            // swap velocities
                            let temp = box.velocity
                            box.velocity = otherBox.velocity
                            otherBox.velocity = temp
                        }
                    }

                    // drag
                    // box.velocity.x *= 1 - dragCoefficient * dt * 0.001
                    // box.velocity.y *= 1 - dragCoefficient * dt * 0.001
                })
                return newBoxes
            })
        },
        velocity.x,
        velocity.y
    )

    return (
        <div className="relative">
            <Player {...{ position, size: playerSize, velocity }} />
            {boxes.map(box => (
                <Box key={box.content} {...box}>
                    {box.content}
                </Box>
            ))}
        </div>
    )
}

export default Boxes
