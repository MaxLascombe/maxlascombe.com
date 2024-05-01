import { Link } from 'wouter'
import { Date as DateType, goals } from './goals'

export const BucketList = () => {
  return (
    <div className='flex w-full flex-col items-center gap-2 bg-black py-12 text-white'>
      <Link href='../..' className='mx-2 text-sm hover:underline'>
        Home
      </Link>
      <div className='text-center md:fixed md:right-5 md:top-5 md:text-right'>
        <div>
          Done:{' '}
          <span className='text-green-400'>
            {
              goals.filter(
                g =>
                  typeof g === 'object' &&
                  typeof g[1] === 'string' &&
                  g[1] !== 'thisyear'
              ).length
            }
          </span>
          /{goals.filter(g => typeof g === 'object').length}
        </div>
        <div>
          Done this year:{' '}
          <span className='text-green-400'>
            {
              goals.filter(
                g =>
                  typeof g === 'object' &&
                  g[1] &&
                  g[1].startsWith(new Date().getFullYear().toString())
              ).length
            }
          </span>
        </div>
        <div>🤞 = hope to get done this year</div>
      </div>
      {goals.map((goal, index) => {
        if (typeof goal === 'string')
          return <SectionHeader key={goal} title={goal} />
        const titlesBeforeMe = goals
          .slice(0, index)
          .filter(goal => typeof goal === 'string').length
        return (
          <Goal
            key={goal[0]}
            title={goal[0]}
            dateDone={goal[1]}
            number={index - titlesBeforeMe + 1}
          />
        )
      })}
    </div>
  )
}

const Goal = ({
  title,
  dateDone,
  number,
}: {
  number: number
  title: string
  dateDone: DateType | 'thisyear' | null
}) => (
  <div className='group flex w-full gap-3'>
    <div className='flex-1'></div>
    <div
      className={
        'flex-0 flex w-96 items-center justify-between ' +
        (dateDone && dateDone !== 'thisyear' ? 'text-green-400' : '')
      }>
      <div className='w-10 flex-shrink-0'>{number}</div>
      <div className='flex flex-grow flex-col gap-1 text-wrap'>
        <div>{title}</div>
        {dateDone && dateDone !== 'thisyear' && (
          <div className='text-xs italic'>Done on: {dateDone}</div>
        )}
      </div>
      <div className='w-8 flex-shrink-0 text-right'>
        {dateDone ? (dateDone === 'thisyear' ? '🤞' : '✅') : '◽️'}
      </div>
    </div>
    <div className='flex flex-1 items-center'>
      <a
        href={mailto(`${number}: ${title}`)}
        className='hidden text-xs group-hover:block'>
        I want to do this with you!
      </a>
    </div>
  </div>
)

const SectionHeader = ({ title }: { title: string }) => (
  <div className='mb-2 mt-10 text-center text-xl font-bold'>{title}</div>
)

const mailto = (goal: string) =>
  `mailto:maxlascombe%40gmail.com?subject=I%20want%20to%20do%20this%20with%20you!&body=Hi%20Max!%0A%0AI%20saw%20your%20bucket%20list%20and%20I%20want%20to%20do%20this%20goal%20with%20you:%0A%0A${goal}%0A%0AHere%20is%20my%20name%20and%20a%20little%20bit%20about%20me:`
