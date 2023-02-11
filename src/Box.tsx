import { ReactNode } from 'react'

type BoxProps = {
  children: ReactNode
  className?: string
  height: number
  link?: string
  onMouseDown?: () => void
  onMouseUp?: () => void
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
  onMouseDown,
  onMouseUp,
  position: { x: left, y: top },
  width,
}: BoxProps) => {
  if (link)
    return (
      <a
        href={link}
        className='text-black no-underline'
        {...{ onMouseDown, onMouseUp }}>
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
        'absolute inline-block flex flex-col items-center justify-center rounded-xl border-2 border-b-8 border-white bg-black p-2 text-center text-sm text-white active:mt-0.5 active:border-b-2 ' +
        className
      }
      {...{ onMouseDown, onMouseUp }}>
      {children}
    </div>
  )
}

export default Box
