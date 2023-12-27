import { Link } from 'wouter'
import { useYearProgress } from '../hooks/useYearProgress'
import { goals } from './goals'

export const Progress = ({
  newsletterLink,
  year,
}: {
  newsletterLink: string | undefined
  year: number
}) => {
  const yearProgress = useYearProgress(year)

  return (
    <div className='flex h-screen w-full flex-col justify-center overflow-hidden bg-black text-white'>
      <div className='mb-5 text-center'>
        <Link href='../..' className='mx-2 text-sm hover:underline'>
          Home
        </Link>
        {newsletterLink !== undefined && (
          <>
            &#x2022;
            <a
              target='_blank'
              href={newsletterLink}
              className='mx-2 text-sm hover:underline'>
              My goals for 2023
            </a>
          </>
        )}
      </div>

      <ProgressBar title='Year Progress' fraction={yearProgress} />

      {year in goals ? (
        goals[year].goals.map(([title, progress, goal]) => (
          <ProgressBar
            title={title}
            fraction={progress / goal}
            exact={`${progress}/${goal}`}
          />
        ))
      ) : (
        <div className='text-center'>No goals for {year}</div>
      )}
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
