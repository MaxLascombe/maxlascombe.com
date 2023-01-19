import { ReactNode } from 'react'

type BoxProps = {
    children: ReactNode
    className?: string
    height: number
    position: {
        x: number
        y: number
    }
    width: number
}

const Box = ({
    children,
    className,
    height,
    position: { x: left, y: top },
    width,
}: BoxProps) => (
    <div
        style={{ height, left, top, width: width }}
        className={
            'absolute border-2 border-b-4 border-white rounded-lg p-2 text-sm text-white inline-block text-center ' +
            className
        }>
        {children}
    </div>
)

export default Box
