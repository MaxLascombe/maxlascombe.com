import { useRef, useState } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'

import SpeechBubble from './SpeechBubble'

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
    position: { x, y },
    size: { height: initialHeight, width: initialWidth },
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

    const height = initialHeight * 2
    const left = x - initialWidth / 2
    const width = initialWidth * 2
    const top = y - initialHeight / 2

    return (
        <>
            <div
                style={{
                    height,
                    left,
                    width,
                    top,
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
            <SpeechBubble
                ownerPosition={{ x: left, y: top }}
                ownerSize={{ height, width }}
                size={{ height: 100, width: 100 }}>
                Hello!
            </SpeechBubble>
        </>
    )
}

export default Player
