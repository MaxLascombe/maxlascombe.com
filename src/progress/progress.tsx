import { Link } from 'wouter'
import { useYearProgress } from '../hooks/useYearProgress'
import { ClockSprite, PlayerSprite } from '../Player'
import { goals } from './goals'

const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <div className='absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full'>
    <p className='rounded-md bg-gray-800 px-2 py-1 text-center text-xs text-white shadow-lg'>
      {children}
    </p>
    <div className='mx-auto size-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800' />
  </div>
)

const RaceComponent = ({
  progress,
  year,
  yearProgress,
}: {
  progress: number
  year: number
  yearProgress: number
}) => (
  <div className='fixed bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent p-5'>
    <div className='absolute bottom-5 left-5 right-5 flex h-5 items-end border border-t-0 border-white'>
      {goals[year].goals.map(([, progress, goal], index, arr) => (
        <div
          key={index}
          className={
            'h-2 rounded-full bg-gradient-to-r ' +
            neonGradients[index % neonGradients.length]
          }
          style={{
            width: `${Math.min((progress / goal) * 100, 100) / arr.length}%`,
          }}></div>
      ))}
    </div>
    <div className='absolute bottom-5 left-5 right-5'>
      <div
        className='absolute bottom-0 h-[60px] w-[60px] -translate-x-1/2'
        style={{ left: `${progress}%` }}>
        <PlayerSprite vX={200} walkingRight={true} />
        <Tooltip>
          I'm {Math.round(progress)}% done with my tasks for the year
        </Tooltip>
      </div>
      <div
        className='absolute bottom-2 -translate-x-1/2'
        style={{ left: `${yearProgress * 100}%` }}>
        <ClockSprite />
        <Tooltip>
          The year is {Math.round(yearProgress * 100)}% complete
        </Tooltip>
      </div>
    </div>
  </div>
)

export const Progress = ({
  newsletterLink,
  year,
}: {
  newsletterLink: string | undefined
  year: number
}) => {
  const yearProgress = useYearProgress(year)

  const megaProgress =
    goals[year].goals.reduce(
      (acc, [_, progress, goal]) => acc + Math.min(progress / goal, 1),
      0
    ) / goals[year].goals.length
  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-wrap py-5 text-8xl font-bold text-white'>
        My goals for {year}
      </h1>

      <div className='flex gap-10 text-white'>
        <Link href='../..' className='text-sm hover:underline'>
          Home
        </Link>
        {newsletterLink !== undefined && (
          <a
            target='_blank'
            rel='noreferrer'
            href={newsletterLink}
            className='mx-2 text-sm hover:underline'>
            Read about my goals here
          </a>
        )}
      </div>

      <div className='mb-48 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4'>
        {goals[year].goals.map(([title, progress, goal], index) => (
          <ProgressBar
            key={title}
            title={title}
            progress={progress}
            goal={goal}
            gradient={neonGradients[index % neonGradients.length]}
          />
        ))}
      </div>

      <RaceComponent
        progress={megaProgress * 100}
        year={year}
        yearProgress={yearProgress}
      />
    </div>
  )
}

const ProgressBar = ({
  title,
  progress,
  goal,
  gradient,
}: {
  title: string
  progress: number
  goal: number
  gradient: string
}) => {
  return (
    <div key={title} className='flex flex-col gap-2 py-6'>
      <p className='text-sm/6 font-medium text-gray-400'>{title}</p>
      <p className='flex items-baseline gap-x-2'>
        <span className='text-4xl font-semibold tracking-tight text-white'>
          {Math.round((progress / goal) * 10000) / 100}%
        </span>
        <span className='text-sm text-gray-400'>{progress}</span>
      </p>
      <div className='relative mt-2 h-2 w-2/3 overflow-hidden rounded-lg bg-gray-900'>
        <div
          className={
            'absolute left-0 top-0 h-full rounded-lg bg-gradient-to-r ' +
            gradient
          }
          style={{ width: `${Math.min((progress / goal) * 100, 100)}%` }}></div>
      </div>
    </div>
  )
}

const neonGradients = [
  'from-pink-500 to-purple-500',
  'from-yellow-500 to-green-500',
  'from-blue-500 to-indigo-500',
  'from-orange-500 to-red-500',
  'from-teal-500 to-lime-500',
  'from-green-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-rose-500 to-fuchsia-500',
  'from-amber-500 to-lime-500',
  'from-sky-500 to-blue-500',
  'from-fuchsia-500 to-violet-500',
  'from-emerald-500 to-cyan-500',
  'from-teal-500 to-indigo-500',
  'from-pink-400 to-yellow-500',
  'from-blue-400 to-green-500',
  'from-violet-500 to-indigo-500',
  'from-rose-400 to-amber-500',
  'from-lime-500 to-teal-500',
  'from-indigo-400 to-cyan-500',
  'from-purple-400 to-rose-500',
]
