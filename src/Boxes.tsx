import { useState } from 'react'
import Box from './Box'
import Controls from './Controls'
import { useBoxesWithCollisions } from './hooks/useBoxesWithCollisions'
import { useKeyAction } from './hooks/useKeyAction'
import { useYearProgress } from './hooks/useYearProgress'
import Player from './Player'

const Boxes = () => {
  const playerSize = { width: 30, height: 30 }

  const socialLinks = {
    fb: 'https://www.facebook.com/maxlascombe',
    tw: 'https://twitter.com/MaxLascombe',
    ig: 'https://www.instagram.com/maxlascombe/',
    li: 'https://www.linkedin.com/in/maxlascombe/',
    gh: 'https://github.com/MaxLascombe',
    yt: 'https://www.youtube.com/MaxLascombe',
    gf: 'https://www.charlotterenner.com/',
  }

  const smallScreen = window.innerWidth < 600

  const [controls, setControls] = useState<{ x: -1 | 0 | 1; y: -1 | 0 | 1 }>({
    x: 0,
    y: 0,
  })

  useKeyAction([
    {
      key: 'ArrowUp',
      function: () => setControls(c => ({ ...c, y: c.y >= 0 ? -1 : c.y })),
    },
    {
      key: 'ArrowDown',
      function: () => setControls(c => ({ ...c, y: c.y <= 0 ? 1 : c.y })),
    },
    {
      key: 'ArrowLeft',
      function: () => setControls(c => ({ ...c, x: c.x >= 0 ? -1 : c.x })),
    },
    {
      key: 'ArrowRight',
      function: () => setControls(c => ({ ...c, x: c.x <= 0 ? 1 : c.x })),
    },
  ])

  useKeyAction(
    [
      {
        key: 'ArrowUp',
        function: () => setControls(c => ({ ...c, y: c.y < 0 ? 0 : c.y })),
      },
      {
        key: 'ArrowDown',
        function: () => setControls(c => ({ ...c, y: c.y > 0 ? 0 : c.y })),
      },
      {
        key: 'ArrowLeft',
        function: () => setControls(c => ({ ...c, x: c.x < 0 ? 0 : c.x })),
      },
      {
        key: 'ArrowRight',
        function: () => setControls(c => ({ ...c, x: c.x > 0 ? 0 : c.x })),
      },
    ],
    'keyup'
  )

  const screenHeight = window.innerHeight
  const contentHeight = 260
  const topBoxY = Math.max(50, (screenHeight - contentHeight) / 2)

  const { boxes, acceleration } = useBoxesWithCollisions(
    [
      {
        key: 'player',
        content: 'P',
        link: '',
        height: playerSize.height,
        velocity: { x: 0, y: 0 },
        position: { x: 50, y: 50 },
        width: playerSize.width,
      },
      {
        key: 'title',
        content: <h1 className='lowercase'>Max Lascombe dot com</h1>,
        link: '/',
        height: 50,
        velocity: {
          x: 0,
          y: 0,
        },
        position: {
          x: window.innerWidth / 2 - 100,
          y: smallScreen ? Math.max(150, topBoxY) : topBoxY,
        },
        width: 200,
      },
      ...Object.entries(socialLinks).map(([key, link], index) => ({
        key,
        content: key,
        height: 30,
        link,
        velocity: {
          x: 0,
          y: 0,
        },
        position: {
          x:
            window.innerWidth / 2 -
            (Object.keys(socialLinks).length * 30) / 2 -
            ((Object.keys(socialLinks).length - 1) * 20) / 2 +
            index * 50,
          y: smallScreen ? Math.max(220, topBoxY + 70) : topBoxY + 70,
        },
        width: 30,
      })),
      {
        key: 'newsletter',
        content: 'newsletter',
        height: 30,
        link: 'https://lifetothemax.substack.com/',
        velocity: {
          x: 0,
          y: 0,
        },
        position: {
          x: window.innerWidth / 2 - 65,
          y: smallScreen ? Math.max(270, topBoxY + 120) : topBoxY + 120,
        },
        width: 130,
      },
      {
        key: 'year-progress',
        className: 'truncate',
        content: <ProgressBar />,
        height: 20,
        link: '/progress',
        linkType: 'link',
        velocity: {
          x: 0,
          y: 0,
        },
        position: {
          x: window.innerWidth / 2 - 150,
          y: smallScreen ? Math.max(320, topBoxY + 170) : topBoxY + 170,
        },
        style: { padding: 0 },
        width: 300,
      },
      {
        key: 'bucket list',
        content: 'bucket list',
        height: 30,
        link: '/bucket-list',
        linkType: 'link',
        velocity: { x: 0, y: 0 },
        position: {
          x: window.innerWidth / 2 - 50,
          y: smallScreen ? Math.max(360, topBoxY + 210) : topBoxY + 210,
        },
        width: 100,
      },
      {
        key: 'tron',
        content: 'tron',
        height: 30,
        link: 'https://tron.maxlascombe.com/',
        velocity: { x: 0, y: 0 },
        position: {
          x: window.innerWidth / 2 - 30,
          y: smallScreen ? Math.max(360, topBoxY + 210) : topBoxY + 260,
        },
        width: 60,
      },
    ],
    controls
  )

  return (
    <div className='relative h-screen select-none bg-black'>
      <Player
        {...{
          acceleration,
          position: boxes[0].position,
          size: playerSize,
          velocity: boxes[0].velocity,
        }}
      />
      {boxes
        .slice(1)
        .sort((a, b) => a.position.y - b.position.y)
        .map(box => (
          <Box {...box}>{box.content}</Box>
        ))}
      <Controls
        leftPress={() => setControls(c => ({ ...c, x: -1 }))}
        leftRelease={() =>
          setControls(c => ({ ...c, x: c.x === -1 ? 0 : c.x }))
        }
        rightPress={() => setControls(c => ({ ...c, x: 1 }))}
        rightRelease={() =>
          setControls(c => ({ ...c, x: c.x === 1 ? 0 : c.x }))
        }
        upPress={() => setControls(c => ({ ...c, y: -1 }))}
        upRelease={() => setControls(c => ({ ...c, y: c.y === -1 ? 0 : c.y }))}
        downPress={() => setControls(c => ({ ...c, y: 1 }))}
        downRelease={() => setControls(c => ({ ...c, y: c.y === 1 ? 0 : c.y }))}
      />
    </div>
  )
}

const ProgressBar = () => {
  const yearProgress = useYearProgress()
  const percentage = `${Math.floor(yearProgress * 100)}%`
  return (
    <div className='flex h-32 w-full flex-row items-center text-xs text-white'>
      <div
        className='h-full rounded-full bg-gradient-to-l from-white'
        style={{ width: percentage }}>
        {yearProgress > 0.5 && percentage}
      </div>
      {yearProgress <= 0.5 && <div className='ml-1'>{percentage}</div>}
    </div>
  )
}

export default Boxes
