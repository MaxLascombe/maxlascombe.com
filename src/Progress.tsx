import { Link } from 'wouter'
import { useYearProgress } from './hooks/useYearProgress'

const Progress = () => {
  const yearProgress = useYearProgress()

  const NEWSLETTERS = 8
  const NEWSLETTER_GOAL = 25
  const BOOKS = 19
  const BOOK_GOAL = 25
  const MISSED_MEDITATIONS = 35
  const MEDITATIONS =
    Math.floor(
      (new Date().getTime() -
        new Date(new Date().getFullYear(), 0, 0).getTime()) /
        24 /
        60 /
        60 /
        1000
    ) - MISSED_MEDITATIONS
  const MEDITATION_GOAL = 250
  const CREATIONS = 10
  const CREATION_GOAL = 25

  const TRIATHLONS = 1
  const TRIATHLON_GOAL = 1
  const MARATHONS = 0
  const MARATHON_GOAL = 1

  const BUCKET_LIST_GOALS = 5
  const BUCKET_LIST_GOAL = 10

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

      <ProgressBar
        title='Post 25 Newsletters'
        fraction={NEWSLETTERS / NEWSLETTER_GOAL}
        exact={`${NEWSLETTERS}/${NEWSLETTER_GOAL}`}
      />

      <ProgressBar
        title='Read 25 Books'
        fraction={BOOKS / BOOK_GOAL}
        exact={`${BOOKS}/${BOOK_GOAL}`}
      />

      <ProgressBar
        title='Meditate 250 Times'
        fraction={Math.round((100 * MEDITATIONS) / MEDITATION_GOAL) / 100}
        exact={`${MEDITATIONS}/${MEDITATION_GOAL}`}
      />

      <ProgressBar
        title='Create 25 Creative Creations'
        fraction={CREATIONS / CREATION_GOAL}
        exact={`${CREATIONS}/${CREATION_GOAL}`}
      />

      <ProgressBar
        title='Complete a Triathlon'
        fraction={TRIATHLONS / TRIATHLON_GOAL}
        exact={`${TRIATHLONS}/${TRIATHLON_GOAL}`}
      />

      <ProgressBar
        title='Complete a Second Marathon'
        fraction={MARATHONS / MARATHON_GOAL}
        exact={`${MARATHONS}/${MARATHON_GOAL}`}
      />

      <ProgressBar
        title='Check 10 items off of my bucket list'
        fraction={BUCKET_LIST_GOALS / BUCKET_LIST_GOAL}
        exact={`${BUCKET_LIST_GOALS}/${BUCKET_LIST_GOAL}`}
      />
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
