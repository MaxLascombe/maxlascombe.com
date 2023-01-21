import { useRef, useState } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'

let walkingSprites: string[] = []

for (let i = 1; i <= 4; i++) {
    walkingSprites.push(`/images/sprites/walking/${i}.PNG`)
}

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
    acceleration: { x: aX },
    position: { x: left, y: top },
    size: { height, width },
    velocity: { x: vX },
}: PlayerProps) => {
    const [sprite, setSprite] = useState(0)
    const dtRef = useRef(0)

    // y = ax + b
    // 150 = a*100 + b
    // 1000 = a*0 + b
    // b = 1000
    // a*100 = 150 - 1000 = -850
    // a = -8.5

    const walkingSpeed =
        Math.abs(vX) < 0.5 ? Infinity : Math.abs(vX) * -8.5 + 1000

    useAnimationFrame(
        dt => {
            dtRef.current += dt

            if (dtRef.current < walkingSpeed) return

            dtRef.current = 0
            setSprite(sprite => (sprite + 1) % walkingSprites.length)
        },
        [walkingSpeed]
    )

    const walkingRight = aX > 0 ? true : aX < 0 ? false : vX > 0

    return (
        <div
            style={{
                height: 2 * height,
                left: left - width / 2,
                top: top - height / 2,
                width: width * 2,
            }}
            className="absolute">
            <img
                src={walkingSprites[sprite]}
                alt="player"
                className={
                    'h-full w-full ' +
                    (walkingRight ? '' : 'transform -scale-x-100')
                }
            />
        </div>
    )
}

export default Player
