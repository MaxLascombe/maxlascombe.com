import { useRef, useState } from 'react'
import { useAnimationFrame } from './useAnimationFrame'
import { useKeyAction } from './useKeyAction'

type BoxData = {
    key: string
    className?: string
    content: string | JSX.Element
    height: number
    link?: string
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

export const useBoxesWithCollisions = (initialBoxes: BoxData[]) => {
    // player acceleration
    const playerKeysForce = 100
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0 })

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
    const [boxes, setBoxes] = useState(initialBoxes)

    useAnimationFrame(
        dt => {
            setBoxes(boxes => {
                let newBoxes = [...boxes]
                newBoxes.forEach((box, index) => {
                    // set player velocity
                    if (index === 0) {
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

                        // if a collision is happening with player, cap the player's velocity to the collision object's velocity, and set player acceleration to 0
                        for (const i of collisionsRef.current?.[0] ?? []) {
                            const otherBox = newBoxes[i]

                            // if otherBox is right of player
                            if (
                                box.position.x + box.width / 2 <
                                otherBox.position.x + otherBox.width / 2
                            ) {
                                box.velocity.x = Math.min(
                                    box.velocity.x,
                                    otherBox.velocity.x
                                )
                                setAcceleration(a => ({
                                    ...a,
                                    x: Math.min(a.x, 0),
                                }))
                            } else {
                                box.velocity.x = Math.max(
                                    box.velocity.x,
                                    otherBox.velocity.x
                                )
                                setAcceleration(a => ({
                                    ...a,
                                    x: Math.max(a.x, 0),
                                }))
                            }

                            // if otherBox is below player
                            if (
                                box.position.y + box.height / 2 <
                                otherBox.position.y + otherBox.height / 2
                            ) {
                                box.velocity.y = Math.min(
                                    box.velocity.y,
                                    otherBox.velocity.y
                                )
                                setAcceleration(a => ({
                                    ...a,
                                    y: Math.min(a.y, 0),
                                }))
                            } else {
                                box.velocity.y = Math.max(
                                    box.velocity.y,
                                    otherBox.velocity.y
                                )
                                setAcceleration(a => ({
                                    ...a,
                                    y: Math.max(a.y, 0),
                                }))
                            }
                        }
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

                    let newCollisions = []
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
                                newCollisions.push(i)
                                let temp = box.velocity
                                box.velocity = otherBox.velocity
                                otherBox.velocity = temp
                                collisionsRef.current[index] = [
                                    ...(collisionsRef.current?.[index] ?? []),
                                    i,
                                ]
                                collisionsRef.current[i] = [
                                    ...(collisionsRef.current?.[i] ?? []),
                                    index,
                                ]
                            }
                        } else {
                            collisionsRef.current[index] =
                                collisionsRef.current[index]?.filter(
                                    c => c !== i
                                ) ?? []
                            collisionsRef.current[i] =
                                collisionsRef.current[i]?.filter(
                                    c => c !== index
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

    return { boxes, acceleration }
}
