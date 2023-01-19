import Box from './Box'
import Player from './Player'
import { useBoxesWithCollisions } from './hooks/useBoxesWithCollisions'

const Boxes = () => {
    const playerSize = { width: 20, height: 30 }
    const { boxes, acceleration } = useBoxesWithCollisions([
        {
            key: 'player',
            content: 'P',
            height: playerSize.height,
            velocity: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
            width: playerSize.width,
        },
        {
            key: 'title',
            className: 'flex flex-col items-center justify-center',
            content: <h1 className="text-xl uppercase">Max Lascombe</h1>,
            height: 100,
            velocity: {
                x: 50,
                y: 30,
            },
            position: {
                x: 100,
                y: 0,
            },
            width: 300,
        },
    ])

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
                <Box {...box}>{box.content}</Box>
            ))}
        </div>
    )
}

export default Boxes
