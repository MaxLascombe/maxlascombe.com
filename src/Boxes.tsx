import { useState } from 'react'

import Box from './Box'
import useAnimationFrame from './hooks/useAnimationFrame'

type BoxData = {
    velocity: {
        x: number
        y: number
    }
    position: {
        x: number
        y: number
    }
}

const Boxes = () => {
    useAnimationFrame(_ => {})

    return (
        <div className="relative">
            <Box left={0}>Test</Box>
        </div>
    )
}

export default Boxes
