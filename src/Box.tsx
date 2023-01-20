import { ReactNode } from 'react'

type BoxProps = {
    children: ReactNode
    className?: string
    height: number
    link?: string
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
    link,
    position: { x: left, y: top },
    width,
}: BoxProps) => {
    if (link)
        return (
            <a href={link} className="no-underline text-black">
                <Box
                    {...{
                        children,
                        className,
                        height,
                        position: { x: left, y: top },
                        width,
                    }}
                />
            </a>
        )
    return (
        <div
            style={{ height: height + 2, left, top, width }}
            className={
                'flex flex-col items-center justify-center absolute border-2 border-b-4 border-white rounded-lg p-2 text-sm text-white inline-block text-center ' +
                className
            }>
            {children}
        </div>
    )
}

export default Box
