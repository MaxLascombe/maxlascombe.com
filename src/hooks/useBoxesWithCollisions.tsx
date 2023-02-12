import { useRef, useState } from 'react'
import { useAnimationFrame } from './useAnimationFrame'
import { useKeyAction } from './useKeyAction'

type BoxData = {
  key: string
  className?: string
  content: string | JSX.Element
  height: number
  link: string
  position: {
    x: number
    y: number
  }
  velocity: {
    x: number
    y: number
  }
  width: number
}

const dragCoefficient = 0.1

export const useBoxesWithCollisions = (
  initialBoxes: BoxData[],
  controls: { left: boolean; up: boolean; right: boolean; down: boolean }
) => {
  // player acceleration
  const playerKeysForce = 100
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0 })

  if (controls.left && acceleration.x >= 0)
    setAcceleration(a => ({ ...a, x: -1 * playerKeysForce }))
  if (controls.right && acceleration.x <= 0)
    setAcceleration(a => ({ ...a, x: playerKeysForce }))
  if (controls.up && acceleration.y >= 0)
    setAcceleration(a => ({ ...a, y: -1 * playerKeysForce }))
  if (controls.down && acceleration.y <= 0)
    setAcceleration(a => ({ ...a, y: playerKeysForce }))
  if (!controls.left && !controls.right && acceleration.x !== 0)
    setAcceleration(a => ({ ...a, x: 0 }))
  if (!controls.up && !controls.down && acceleration.y !== 0)
    setAcceleration(a => ({ ...a, y: 0 }))

  // collisions helper
  const collisionsRef: { current: number[][] } = useRef([])
  //
  // player is first box
  const [boxes, setBoxes] = useState(initialBoxes)

  useKeyAction(
    [
      {
        key: 'p',
        function: () => {
          const position = boxes[0].position

          const facingRight =
            acceleration.x > 0
              ? true
              : acceleration.x < 0
              ? false
              : boxes[0].velocity.x > 0

          // find closest box
          let closestBox = null
          let closestDistance = Infinity
          for (let i = 1; i < boxes.length; i++) {
            // box and player are at colliding y positions
            if (
              !(
                boxes[i].position.y + boxes[i].height > position.y &&
                boxes[i].position.y < position.y + boxes[0].height
              )
            )
              continue

            let distance = facingRight
              ? boxes[i].position.x - position.x - boxes[0].width
              : position.x - boxes[i].position.x - boxes[i].width
            if (distance < closestDistance && distance > 0) {
              closestBox = boxes[i]
              closestDistance = distance
            }
          }

          if (closestBox && closestDistance < 30)
            window.location.href = closestBox.link
        },
      },
      {
        key: 'ArrowUp',
        function: () =>
          setAcceleration(a => ({ ...a, y: -1 * playerKeysForce })),
      },
      {
        key: 'ArrowDown',
        function: () => setAcceleration(a => ({ ...a, y: playerKeysForce })),
      },
      {
        key: 'ArrowLeft',
        function: () =>
          setAcceleration(a => ({ ...a, x: -1 * playerKeysForce })),
      },
      {
        key: 'ArrowRight',
        function: () => setAcceleration(a => ({ ...a, x: playerKeysForce })),
      },
    ],
    'keydown'
  )

  useKeyAction(
    [
      {
        key: 'ArrowUp',
        function: () => setAcceleration(a => ({ ...a, y: a.y < 0 ? 0 : a.y })),
      },
      {
        key: 'ArrowDown',
        function: () => setAcceleration(a => ({ ...a, y: a.y > 0 ? 0 : a.y })),
      },
      {
        key: 'ArrowLeft',
        function: () => setAcceleration(a => ({ ...a, x: a.x < 0 ? 0 : a.x })),
      },
      {
        key: 'ArrowRight',
        function: () => setAcceleration(a => ({ ...a, x: a.x > 0 ? 0 : a.x })),
      },
    ],
    'keyup'
  )

  useAnimationFrame(
    dt => {
      setBoxes(boxes => {
        let newBoxes = [...boxes]
        newBoxes.forEach((box, index) => {
          // update velocities
          const isPlayer = index === 0
          if (isPlayer) {
            box.velocity = {
              x:
                box.velocity.x +
                (Math.abs(box.velocity.x) < 100
                  ? acceleration.x * dt * 0.001
                  : 0) -
                box.velocity.x * dragCoefficient * dt * 0.001,
              y:
                box.velocity.y +
                (Math.abs(box.velocity.y) < 100
                  ? acceleration.y * dt * 0.001
                  : 0) -
                box.velocity.y * dragCoefficient * dt * 0.001,
            }
          } else {
            box.velocity.x *= 1 - dragCoefficient * dt * 0.001
            box.velocity.y *= 1 - dragCoefficient * dt * 0.001
          }

          // if a collision is happening with box, cap the box's velocity to the collision object's velocity, and set box acceleration to 0
          for (const i of collisionsRef.current?.[index] ?? []) {
            const otherBox = newBoxes[i]

            // if otherBox is right of box
            if (
              box.position.x + box.width / 2 <
              otherBox.position.x + otherBox.width / 2
            ) {
              box.velocity.x = Math.min(box.velocity.x, otherBox.velocity.x)
              if (isPlayer)
                setAcceleration(a => ({
                  ...a,
                  x: Math.min(a.x, 0),
                }))
            } else {
              box.velocity.x = Math.max(box.velocity.x, otherBox.velocity.x)
              if (isPlayer)
                setAcceleration(a => ({
                  ...a,
                  x: Math.max(a.x, 0),
                }))
            }

            // if otherBox is below box
            if (
              box.position.y + box.height / 2 <
              otherBox.position.y + otherBox.height / 2
            ) {
              box.velocity.y = Math.min(box.velocity.y, otherBox.velocity.y)
              if (isPlayer)
                setAcceleration(a => ({
                  ...a,
                  y: Math.min(a.y, 0),
                }))
            } else {
              box.velocity.y = Math.max(box.velocity.y, otherBox.velocity.y)
              if (isPlayer)
                setAcceleration(a => ({
                  ...a,
                  y: Math.max(a.y, 0),
                }))
            }
          }

          // update position based on veolicty
          box.position.x += box.velocity.x * dt * 0.001
          box.position.y += box.velocity.y * dt * 0.001

          // collisions with walls
          if (box.position.x < 0) {
            box.position.x *= -1
            box.velocity.x *= -1
          }
          if (box.position.x > window.innerWidth - box.width) {
            box.position.x =
              2 * (window.innerWidth - box.width) - box.position.x
            box.velocity.x *= -1
          }
          if (box.position.y < 0) {
            box.position.y *= -1
            box.velocity.y *= -1
          }
          if (box.position.y > window.innerHeight - box.height) {
            box.position.y =
              2 * (window.innerHeight - box.height) - box.position.y
            box.velocity.y *= -1
          }

          let newCollisions = []
          // collisions with other boxes
          for (let i = 0; i < index; i++) {
            let otherBox = newBoxes[i]
            // other box and box collided
            if (
              box.position.x < otherBox.position.x + otherBox.width &&
              box.position.x + box.width > otherBox.position.x &&
              box.position.y < otherBox.position.y + otherBox.height &&
              box.position.y + box.height > otherBox.position.y
            ) {
              // swap velocities of collision direction
              if (!collisionsRef.current?.[index]?.includes(i)) {
                newCollisions.push(i)
                let temp = box.velocity
                box.velocity = otherBox.velocity
                otherBox.velocity = temp
                collisionsRef.current[index] = [
                  ...(collisionsRef.current?.[index] ?? []),
                  i,
                ]
                collisionsRef.current[i] = [
                  ...(collisionsRef.current?.[i] ?? []),
                  index,
                ]
              }
            } else {
              collisionsRef.current[index] =
                collisionsRef.current[index]?.filter(c => c !== i) ?? []
              collisionsRef.current[i] =
                collisionsRef.current[i]?.filter(c => c !== index) ?? []
            }
          }
        })
        return newBoxes
      })
    },
    acceleration.x,
    acceleration.y
  )

  return { boxes, acceleration }
}
