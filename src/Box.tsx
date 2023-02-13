import { ReactNode } from 'react'

type BoxProps = {
  children: ReactNode
  className?: string
  height: number
  link?: string
  onMouseDown?: () => void
  onMouseUp?: () => void
  onTouchStart?: () => void
  onTouchEnd?: () => void
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
  onTouchStart,
  onTouchEnd,
  position: { x: left, y: top },
  width,
}: BoxProps) => {
  if (link)
    return (
      <a
        href={link}
        target='_blank'
        className='text-black no-underline'
        {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
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
        'absolute inline-block flex flex-col items-center justify-center rounded-xl border-2 border-b-8 border-white bg-black bg-black p-2 text-center text-sm text-white active:mt-0.5 active:border-b-2 ' +
        className
      }
      {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
      {children}
    </div>
  )
}

export default Box
