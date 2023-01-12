import { ReactNode } from 'react'

type BoxProps = {
    left: number
    children: ReactNode
}

const Box = ({ children, left }: BoxProps) => {
    return (
        <div
            style={{ left }}
            className="absolute border-2 border-b-4 border-white rounded-lg p-2 text-sm text-white inline-block">
            {children}
        </div>
    )
}

export default Box
