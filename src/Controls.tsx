import Box from './Box'

const CONTROL_DIMENSIONS = { height: 30, width: 30 }

const Controls = ({
    leftPress,
    leftRelease,
    upPress,
    upRelease,
    rightPress,
    rightRelease,
    downPress,
    downRelease,
}: {
    leftPress: () => void
    leftRelease: () => void
    upPress: () => void
    upRelease: () => void
    rightPress: () => void
    rightRelease: () => void
    downPress: () => void
    downRelease: () => void
}) => (
    <div
        className="absolute bottom-7 right-5 text-white opacity-80"
        style={{
            height: CONTROL_DIMENSIONS.height * 3,
            width: CONTROL_DIMENSIONS.width * 3,
        }}>
        <Box
            onMouseDown={leftPress}
            onMouseUp={leftRelease}
            position={{ x: 0, y: CONTROL_DIMENSIONS.height }}
            {...CONTROL_DIMENSIONS}>
            &#8592;
        </Box>
        <Box
            onMouseDown={upPress}
            onMouseUp={upRelease}
            position={{ x: CONTROL_DIMENSIONS.width, y: 0 }}
            {...CONTROL_DIMENSIONS}>
            &#8593;
        </Box>
        <Box
            onMouseDown={rightPress}
            onMouseUp={rightRelease}
            position={{
                x: CONTROL_DIMENSIONS.width * 2,
                y: CONTROL_DIMENSIONS.height,
            }}
            {...CONTROL_DIMENSIONS}>
            &#8594;
        </Box>
        <Box
            onMouseDown={downPress}
            onMouseUp={downRelease}
            position={{
                x: CONTROL_DIMENSIONS.width,
                y: CONTROL_DIMENSIONS.height * 2,
            }}
            {...CONTROL_DIMENSIONS}>
            &#8595;
        </Box>
    </div>
)

export default Controls
