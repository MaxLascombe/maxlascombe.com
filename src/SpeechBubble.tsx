import { useState } from 'react'
import { useAnimationTimeout } from './hooks/useAnimationFrame'
import { useKeyAction } from './hooks/useKeyAction'

const BUBBLE_MARGIN = 20

const SpeechBubble = ({
  children,
  leftKey,
  ownerPosition: { x, y },
  ownerSize: { height: oHeight, width: oWidth },
  rightKey: { onPress: rightOnPress, text: rightText, key: rightKey },
  size: { height, width },
}: SpeechBubbleProps) => {
  useKeyAction([
    { key: rightKey, function: rightOnPress },
    ...(leftKey ? [{ key: leftKey.key, function: leftKey.onPress }] : []),
  ])

  const bubbleOrientation: 'top' | 'left' | 'right' =
    y > height + BUBBLE_MARGIN
      ? 'top'
      : x > width + BUBBLE_MARGIN
      ? 'left'
      : 'right'

  const top =
    bubbleOrientation === 'top'
      ? y - height
      : Math.max(BUBBLE_MARGIN, y + oHeight / 2 - height / 2)
  const left =
    bubbleOrientation === 'top'
      ? Math.max(
          BUBBLE_MARGIN,
          Math.min(
            window.innerWidth - width - BUBBLE_MARGIN,
            x + oWidth / 2 - width / 2
          )
        )
      : bubbleOrientation === 'left'
      ? x - width
      : x + oWidth

  return (
    <div
      className='absolute z-10 rounded-xl border bg-black bg-opacity-80 p-2 text-center text-white'
      style={{ height, left, top, width }}>
      <p className='w-full whitespace-normal'>{children}</p>
      <SpeechArrow
        bubbleSize={{ height, width }}
        orientation={bubbleOrientation}
        ownerPosition={{ x, y }}
        ownerSize={{ height: oHeight, width: oWidth }}
        position={{ x: left, y: top }}
      />
      {leftKey && (
        <KeyOption
          onClick={leftKey.onPress}
          keySymbol={leftKey.key}
          right={false}>
          {leftKey.text}
        </KeyOption>
      )}
      <KeyOption onClick={rightOnPress} keySymbol={rightKey}>
        {rightText}
      </KeyOption>
    </div>
  )
}

const KeyOption = ({
  children,
  keySymbol,
  onClick,
  right = true,
}: {
  children: React.ReactNode
  keySymbol: string
  onClick: () => void
  right?: boolean
}) => {
  const [pressed, setPressed] = useState(right)

  useAnimationTimeout(() => setPressed(p => !p), 500)

  return (
    <div
      onClick={onClick}
      className={
        'absolute bottom-0 cursor-pointer p-2 ' + (right ? 'right-0' : 'left-0')
      }>
      <div className='flex h-6 items-center'>
        <div
          className={
            'flex hidden w-6 items-center justify-center rounded-lg border-2 text-xs uppercase md:block ' +
            (pressed ? 'h-5.5 relative top-[2px]' : 'h-6 border-b-4')
          }>
          {keySymbol}
        </div>
        <div className='ml-1 mr-1 text-xs'>{children}</div>
      </div>
    </div>
  )
}

const SpeechArrow = ({
  bubbleSize: { height, width },
  orientation,
  ownerPosition: { x: oX, y: oY },
  ownerSize: { height: oHeight, width: oWidth },
  position: { x, y },
}: {
  bubbleSize: { height: number; width: number }
  orientation: 'top' | 'left' | 'right'
  ownerPosition: { x: number; y: number }
  ownerSize: { height: number; width: number }
  position: { x: number; y: number }
}) => {
  const ARROW_WIDTH = 20

  const rotate =
    orientation === 'top'
      ? 'rotate-0'
      : orientation === 'left'
      ? '-rotate-90'
      : 'rotate-90'
  const top =
    orientation === 'top'
      ? height - 2
      : Math.max(
          6,
          Math.min(
            oY - y + oHeight / 2 - ARROW_WIDTH / 2,
            height - ARROW_WIDTH - 6
          )
        )
  const left =
    orientation === 'top'
      ? Math.max(
          4,
          Math.min(
            oX - x + oWidth / 2 - ARROW_WIDTH / 2,
            width - 4 - ARROW_WIDTH
          )
        )
      : orientation === 'left'
      ? width - 6
      : -16
  return (
    <div
      className={'absolute h-3 w-5 truncate ' + rotate}
      style={{ left, top }}>
      <div className='absolute left-[6px] top-0 h-3 w-[8px] bg-black'></div>
      <div className='absolute top-[-9px] w-5 text-center'>▽</div>
    </div>
  )
}

export default SpeechBubble

type KeyPress = {
  onPress: () => void
  text: string
  key: 'n' | 'x'
}

type SpeechBubbleProps = {
  children: string
  leftKey?: KeyPress
  ownerPosition: {
    x: number
    y: number
  }
  ownerSize: {
    width: number
    height: number
  }
  rightKey: KeyPress
  size: {
    width: number
    height: number
  }
}
