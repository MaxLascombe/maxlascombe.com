import { ReactNode } from 'react'

type BoxProps = {
    children: ReactNode
    height: number
    position: {
        x: number
        y: number
    }
    width: number
}

const Box = ({
    children,
    height,
    position: { x: left, y: top },
    width,
}: BoxProps) => (
    <div
        style={{ height: height - 6, left, top, width: width - 4 }}
        className="absolute border-2 border-b-4 border-white rounded-lg p-2 text-sm text-white inline-block text-center">
        {children}
    </div>
)

export default Box
