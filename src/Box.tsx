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
  style?: any
  width: number
}

const Box = ({
  children,
  className: moreClassName,
  height,
  link,
  linkType = 'a',
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  position: { x: left, y: top },
  style: moreStyle,
  width,
}: BoxProps) => {
  const style = { height: height + 6, left, top, width, ...moreStyle }
  const className =
    'text-black no-underline absolute inline-block flex flex-col items-center justify-center rounded-xl focus:outline-none border-2 border-b-8 border-white bg-black bg-black p-2 text-center text-sm text-white ring-offset-2 outline-white ring-offset-black focus:ring hover:ring ring-white active:mt-0.5 active:border-b-2 ' +
    moreClassName
  if (link) {
    if (linkType === 'link')
      return (
        <Link href={link}>
          <a
            style={style}
            className={className}
            {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
            {children}
          </a>
        </Link>
      )
    return (
      <a
        href={link}
        target='_blank'
        style={style}
        className={className}
        {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
        {children}
      </a>
    )
  }
  return (
    <button
      style={style}
      className={className}
      {...{ onMouseDown, onMouseUp, onTouchStart, onTouchEnd }}>
      {children}
    </button>
  )
}

export default Box
