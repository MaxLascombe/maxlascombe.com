import { Link } from 'wouter'
import { useYearProgress } from '../../hooks/useYearProgress'

const Progress = () => {
  const yearProgress = useYearProgress(2023)

  const goals: [string, number, number][] = [
    ['Post 25 Newsletters', 9, 25],
    ['Read 25 Books', 24, 25],
    [
      'Meditate 250 Times',
      Math.floor(
        (new Date().getTime() -
          new Date(new Date().getFullYear(), 0, 0).getTime()) /
          24 /
          60 /
          60 /
          1000
      ) - 85,
      250,
    ],
    ['Create 25 Creative Creations', 15, 25],
    ['Complete a Triathlon', 1, 1],
    ['Complete a Second Marathon', 1, 1],
    ['Check 10 items off of my bucket list', 8, 10],
  ]

  return (
    <div className='flex h-screen w-full flex-col justify-center overflow-hidden bg-black text-white'>
      <div className='mb-5 text-center'>
        <Link href='/'>
          <a className='mx-2 text-sm hover:underline'>Home</a>
        </Link>
        &#x2022;
        <a
          target='_blank'
          href='https://lifetothemax.substack.com/p/what-i-will-achieve-in-2023-the-year'
          className='mx-2 text-sm hover:underline'>
          My goals for 2023
        </a>
      </div>

      <ProgressBar title='Year Progress' fraction={yearProgress} />

      {goals.map(([title, current, goal]) => (
        <ProgressBar
          key={title}
          title={title}
          fraction={current / goal}
          exact={`${current}/${goal}`}
        />
      ))}
    </div>
  )
}

const ProgressBar = ({
  exact,
  fraction,
  title,
}: {
  exact?: string
  fraction: number
  title: string
}) => {
  return (
    <div className='mb-3 flex flex-col items-center justify-center px-5'>
      <div className='my-2 flex w-full max-w-md justify-between text-left text-xs'>
        <div className='lowercase'>{title}</div>
        <div>
          {Math.round(fraction * 100000 * 100) / 100000} %{' '}
          {exact !== undefined && `(${exact})`}
        </div>
      </div>
      <div className='h-4 w-full max-w-md truncate rounded-full border-2 border-white'>
        <div
          className='h-full rounded-full bg-gradient-to-l from-white'
          style={{ width: `${Math.min(fraction, 1) * 100}%` }}></div>
      </div>
    </div>
  )
}
export default Progress
