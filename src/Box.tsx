import { ReactNode } from 'react'
import { Link } from 'wouter'

type BoxProps = {
  children: ReactNode
  className?: string
  height: number
  link?: string
  linkType?: 'a' | 'link'
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
  linkType = 'a',
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  position: { x: left, y: top },
  width,
}: BoxProps) => {
        const style = { height: height + 6, left, top, width }
        const cN = 'absolute inline-block flex flex-col items-center justify-center rounded-xl border-2 border-b-8 border-white bg-black bg-black p-2 text-center text-sm text-white ring-offset-1 focus:ring focus:ring-white active:mt-0.5 active:border-b-2 ' +
        className
  if (link) {
    if (linkType === 'link')
      return (
        <Link href={link}>
          <a
                  style={style}
      className={
       cN 
                  }>
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
        </Link>
      )
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
  }
  return (
    <button
      style={style}
      className={
        'absolute inline-block flex flex-col items-center justify-center rounded-xl border-2 border-b-8 border-white bg-black bg-black p-2 text-center text-sm text-white ring-offset-1 focus:ring focus:ring-white active:mt-0.5 active:border-b-2 ' +
        className
      }
      {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
      {children}
    </button>
  )
}

export default Box
