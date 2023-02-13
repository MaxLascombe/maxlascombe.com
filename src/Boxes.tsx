import { useState } from 'react'
import Box from './Box'
import Controls from './Controls'
import Player from './Player'
import { useBoxesWithCollisions } from './hooks/useBoxesWithCollisions'

const Boxes = () => {
  const playerSize = { width: 30, height: 30 }

  const socialLinks = {
    fb: 'https://www.facebook.com/maxlascombe',
    tw: 'https://twitter.com/MaxLascombe',
    ig: 'https://www.instagram.com/maxlascombe/',
    li: 'https://www.linkedin.com/in/maxlascombe/',
    gh: 'https://github.com/MaxLascombe',
    yt: 'https://www.youtube.com/MaxLascombe',
  }

  const smallScreen = window.innerWidth < 600

  const [controls, setControls] = useState<{ x: -1 | 0 | 1; y: -1 | 0 | 1 }>({
    x: 0,
    y: 0,
  })

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
          y: 50 + (smallScreen ? 100 : 0),
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
          y: 130 + (smallScreen ? 100 : 0),
        },
        width: 30,
      })),
      {
        key: 'newsletter',
        content: 'my newsletter',
        height: 40,
        link: 'https://lifetothemax.substack.com/',
        velocity: {
          x: 0,
          y: 0,
        },
        position: {
          x: window.innerWidth / 2 - 75,
          y: 190 + (smallScreen ? 100 : 0),
        },
        width: 150,
      },
    ],
    controls
  )

  return (
    <div className='relative h-screen bg-black'>
      <Player
        {...{
          acceleration,
          position: boxes[0].position,
          size: playerSize,
          velocity: boxes[0].velocity,
        }}
      />
      {boxes.slice(1).map(box => (
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

export default Boxes
