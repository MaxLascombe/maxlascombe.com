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
            ? -height
            : Math.max(-y + BUBBLE_MARGIN, oHeight / 2 - height / 2)
    const left =
        bubbleOrientation === 'top'
            ? Math.max(-x + BUBBLE_MARGIN, oWidth / 2 - width / 2)
            : bubbleOrientation === 'left'
            ? -width
            : oWidth

    return (
        <div
            className="absolute text-white border-2 rounded-xl z-10 bg-black bg-opacity-90"
            style={{ height, left, top, width }}>
            {children}
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
