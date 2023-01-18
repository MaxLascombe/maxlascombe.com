import { useRef, useState } from 'react'

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
    acceleration: {
        x: number
        y: number
    }
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
    // player acceleration
    const playerKeysForce = 100
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0 })

    const playerSize = { width: 20, height: 30 }

    // collisions helper
    const collisionsRef: { current: number[][] } = useRef([])

    useKeyAction(
        [
            [
                'ArrowUp',
                () => setAcceleration(a => ({ ...a, y: -1 * playerKeysForce })),
            ],
            [
                'ArrowDown',
                () => setAcceleration(a => ({ ...a, y: playerKeysForce })),
            ],
            [
                'ArrowLeft',
                () => setAcceleration(a => ({ ...a, x: -1 * playerKeysForce })),
            ],
            [
                'ArrowRight',
                () => setAcceleration(a => ({ ...a, x: playerKeysForce })),
            ],
        ],
        'keydown'
    )

    useKeyAction(
        [
            [
                'ArrowUp',
                () => setAcceleration(a => ({ ...a, y: a.y < 0 ? 0 : a.y })),
            ],
            [
                'ArrowDown',
                () => setAcceleration(a => ({ ...a, y: a.y > 0 ? 0 : a.y })),
            ],
            [
                'ArrowLeft',
                () => setAcceleration(a => ({ ...a, x: a.x < 0 ? 0 : a.x })),
            ],
            [
                'ArrowRight',
                () => setAcceleration(a => ({ ...a, x: a.x > 0 ? 0 : a.x })),
            ],
        ],
        'keyup'
    )

    // player is first box
    const [boxes, setBoxes] = useState<BoxData[]>([
        {
            content: 'P',
            height: playerSize.height,
            velocity: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
            width: playerSize.width,
        },
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
            setBoxes(boxes => {
                let newBoxes = [...boxes]
                newBoxes.forEach((box, index) => {
                    // set player velocity
                    if (index === 0)
                        box.velocity = {
                            x:
                                box.velocity.x +
                                (Math.abs(box.velocity.x) < 100
                                    ? acceleration.x * dt * 0.001
                                    : 0) -
                                box.velocity.x * dragCoefficient * dt * 0.001,
                            y:
                                box.velocity.y +
                                (Math.abs(box.velocity.y) < 100
                                    ? acceleration.y * dt * 0.001
                                    : 0) -
                                box.velocity.y * dragCoefficient * dt * 0.001,
                        }

                    // apply drag to non player boxes
                    if (index > 0) {
                        box.velocity.x *= 1 - dragCoefficient * dt * 0.001
                        box.velocity.y *= 1 - dragCoefficient * dt * 0.001
                    }

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
                            // swap velocities of collision direction
                            if (!collisionsRef.current?.[index]?.includes(i)) {
                                let temp = box.velocity
                                box.velocity = otherBox.velocity
                                otherBox.velocity = temp
                                collisionsRef.current[index] = [
                                    ...(collisionsRef.current?.[index] ?? []),
                                    i,
                                ]
                            } else {
                                if (i === 0) {
                                    // if a collision is happening with player, cap the player's velocity to the collision object's velocity, and set player acceleration to 0
                                    if (
                                        (otherBox.velocity.x < 0 &&
                                            box.velocity.x >
                                                otherBox.velocity.x) ||
                                        (otherBox.velocity.x > 0 &&
                                            box.velocity.x <
                                                otherBox.velocity.x)
                                    ) {
                                        otherBox.velocity.x = -box.velocity.x
                                        setAcceleration(a => ({ ...a, x: 0 }))
                                    }
                                    if (
                                        (otherBox.velocity.y < 0 &&
                                            box.velocity.y >
                                                otherBox.velocity.y) ||
                                        (otherBox.velocity.y > 0 &&
                                            box.velocity.y <
                                                otherBox.velocity.y)
                                    ) {
                                        otherBox.velocity.y = -box.velocity.y
                                        setAcceleration(a => ({ ...a, y: 0 }))
                                    }
                                }
                            }
                        } else {
                            collisionsRef.current[index] =
                                collisionsRef.current[index]?.filter(
                                    c => c !== i
                                ) ?? []
                        }
                    }
                })
                return newBoxes
            })
        },
        acceleration.x,
        acceleration.y
    )

    return (
        <div className="relative">
            <div className="text-white">
                {boxes[0].velocity.x.toFixed(2)}{' '}
                {boxes[0].velocity.y.toFixed(2)}
            </div>
            <Player
                {...{
                    acceleration,
                    position: boxes[0].position,
                    size: playerSize,
                    velocity: boxes[0].velocity,
                }}
            />
            {boxes.slice(1).map(box => (
                <Box key={box.content} {...box}>
                    {box.content}
                </Box>
            ))}
        </div>
    )
}

export default Boxes
