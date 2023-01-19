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

export default Player
