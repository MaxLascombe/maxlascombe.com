import { useState } from 'react'

import Box from './Box'
import useAnimationFrame from './hooks/useAnimationFrame'

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

const Player = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    return (
        <div
            style={{ left: position.x, top: position.y }}
            className="absolute border-2 border-white w-5 h-10 rounded"></div>
    )
}

const Boxes = () => {
    const [boxes, setBoxes] = useState<BoxData[]>([
        {
            content: 'Box 1',
            height: 50,
            velocity: {
                x: 50,
                y: 30,
            },
            position: {
                x: 0,
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
    ])

    useAnimationFrame(dt => {
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
                        2 * (window.innerHeight - box.height) - box.position.y
                    box.velocity.y *= -1
                }

                for (let i = 0; i < index; i++) {
                    let otherBox = newBoxes[i]
                    // other box and box collided
                    if (
                        box.position.x < otherBox.position.x + otherBox.width &&
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
                box.velocity.x *= 1 - dragCoefficient * dt * 0.001
                box.velocity.y *= 1 - dragCoefficient * dt * 0.001
            })
            return newBoxes
        })
    })

    return (
        <div className="relative">
            <Player />
            {boxes.map(box => (
                <Box key={box.content} {...box}>
                    {box.content}
                </Box>
            ))}
        </div>
    )
}

export default Boxes
