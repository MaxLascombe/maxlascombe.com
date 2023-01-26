const BUBBLE_MARGIN = 20

const SpeechBubble = ({
    children,
    ownerPosition: { x, y },
    ownerSize: { height: oHeight, width: oWidth },
    size: { height, width },
}: SpeechBubbleProps) => {
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
            className="absolute text-white border-2 rounded-xl z-10 bg-black bg-opacity-90 p-2 text-center"
            style={{ height, left, top, width }}>
            {children}
            <SpeechArrow
                bubbleSize={{ height, width }}
                orientation={bubbleOrientation}
                ownerPosition={{ x, y }}
                ownerSize={{ height: oHeight, width: oWidth }}
                position={{ x: left, y: top }}
            />
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
            ? height - 4
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
            ? width - 8
            : -16
    return (
        <div
            className={'absolute truncate h-3 w-5 ' + rotate}
            style={{ left, top }}>
            <div className="absolute h-3 left-[6px] top-0 w-[8px] bg-black"></div>
            <div className="absolute top-[-9px] w-5 text-center">▽</div>
        </div>
    )
}

export default SpeechBubble

type SpeechBubbleProps = {
    children: string
    ownerPosition: {
        x: number
        y: number
    }
    ownerSize: {
        width: number
        height: number
    }
    size: {
        width: number
        height: number
    }
}
