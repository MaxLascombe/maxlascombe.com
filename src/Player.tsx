import { useState } from 'react'
import { useAnimationTimeout } from './hooks/useAnimationFrame'

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
  const [speechBubbleIndex, setSpeechBubbleIndex] = useState(0)

  const walkingSpeed =
    Math.abs(vX) < 1 ? Infinity : Math.abs(vX / 2) * -8.5 + 1000

  useAnimationTimeout(
    () => setSprite(sprite => (sprite + 1) % walkingSprites.length),
    walkingSpeed
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
        className='absolute'>
        <img
          src={walkingSprites[sprite]}
          alt='player'
          className={
            'h-full w-full ' + (walkingRight ? '' : '-scale-x-100 transform')
          }
        />
      </div>
      {speechBubbleIndex < SPEECH_BUBBLES.length && (
        <SpeechBubble
          leftKey={{
            key: 'x',
            onPress: () => setSpeechBubbleIndex(SPEECH_BUBBLES.length),
            text: 'Skip',
          }}
          ownerPosition={{ x: left, y: top }}
          ownerSize={{ height, width }}
          rightKey={{
            key: 'n',
            onPress: () => setSpeechBubbleIndex(s => s + 1),
            text: 'Next',
          }}
          size={SPEECH_BUBBLES[speechBubbleIndex].size}>
          {SPEECH_BUBBLES[speechBubbleIndex].text}
        </SpeechBubble>
      )}
    </>
  )
}

const THREE_LINE_HEIGHT = 120
const TWO_LINE_HEIGHT = 95

const SPEECH_BUBBLES = [
  {
    text: "Hey, I'm Max. Welcome to my website!",
    size: { height: THREE_LINE_HEIGHT, width: 140 },
  },
  {
    text: "I made this website to show off the things I'm working on, and to have all my links in one place.",
    size: { height: THREE_LINE_HEIGHT, width: 250 },
  },
  {
    text: 'All the boxes on this page are clickable.',
    size: { height: THREE_LINE_HEIGHT, width: 140 },
  },
  {
    text: 'Oh, also! You can move me around with the arrow keys.',
    size: { height: THREE_LINE_HEIGHT, width: 180 },
  },
  {
    text: "Why? Because it's fun!",
    size: { height: TWO_LINE_HEIGHT, width: 140 },
  },
  {
    text: 'And if you collide with any of the boxes, you might mess up my website.',
    size: { height: THREE_LINE_HEIGHT, width: 200 },
  },
  {
    text: 'So, please, be careful.',
    size: { height: TWO_LINE_HEIGHT, width: 140 },
  },
  {
    text: 'Anyway, hope you enjoy your stay!',
    size: { height: THREE_LINE_HEIGHT, width: 140 },
  },
]

export default Player
