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
            style={{ height: height + 6, left, top, width }}
            className={
                'flex flex-col items-center justify-center absolute bg-black border-2 border-b-8 active:border-b-2 active:mt-0.5 border-white rounded-xl p-2 text-sm text-white inline-block text-center ' +
                className
            }>
            {children}
        </div>
    )
}

export default Box
