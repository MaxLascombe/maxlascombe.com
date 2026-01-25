import { goals as bucketListGoals } from '../bucket-list/goals'

const bucketListGoalsPerYear = new Map<string, number>()
for (const g of bucketListGoals) {
  if (typeof g === 'string') continue
  if (g[1] === null) continue
  const year = g[1].split('-')[0]
  bucketListGoalsPerYear.set(year, (bucketListGoalsPerYear.get(year) ?? 0) + 1)
}

console.log(bucketListGoalsPerYear)

export const goals: Record<
  number,
  { link: string | undefined; goals: [string, number, number][] }
> = {
  2023: {
    link: 'https://open.substack.com/pub/lifetothemax/p/what-i-will-achieve-in-2023-the-year',
    goals: [
      ['Post 25 Newsletters', 10, 25],
      ['Read 25 Books', 25, 25],
      ['Meditate 250 Times', 280, 250],
      ['Create 25 Creative Creations', 15, 25],
      ['Complete a Triathlon', 1, 1],
      ['Complete a Second Marathon', 1, 1],
      [
        'Check 10 items off of my bucket list',
        bucketListGoalsPerYear.get('2023') ?? 0,
        10,
      ],
    ],
  },
  2024: {
    link: 'https://lifetothemax.substack.com/p/2024-goals',
    goals: [
      ['Publish 42 creations (including newsletters)', 23, 42],
      ['Read 25 books', 23, 25],
      ['Meditate 250 times', 238, 250],
      ['Do 36,500 pushups', 17_314, 36_500],
      ['Do 100 endurance workouts', 66, 100],
      [
        'Check seven items off my bucket list',
        bucketListGoalsPerYear.get('2024') ?? 0,
        7,
      ],
      ['Travel to five different countries', 11, 5],
      ['Have a conversation in Tagalog', 0, 1],
      ['Complete all 16 of my work milestones', 14, 14],
    ],
  },
  2025: {
    link: 'https://lifetothemax.substack.com/p/fourteen-goals-for-2025',
    goals: [
      ['Publish 20 posts on lifetothemax', 3, 20],
      ['Publish 10 other creations', 10, 10],
      ['Read 25 books', 12, 25],
      ['Meditate 200 times', 136, 200],
      ['Watch 100 movies', 100, 100],
      ['Spend 0 minutes on Twitter or TikTok', 1, 1],
      ['Learn how to lift weights', 1, 1],
      ['Train for and complete a 5k, ...', 1, 1],
      ['... a 10k, ...', 1, 2],
      ['... and a half marathon', 0, 1],
      [
        'Check 6 items off my bucket list',
        bucketListGoalsPerYear.get('2025') ?? 0,
        6,
      ],
      ['Travel to 3 new countries', ['Taiwan', 'Laos'].length, 3],
      ['Donate blood', 0, 1],
      ['Complete my work milestones', 17, 17],
    ],
  },
  2026: {
    link: '',
    goals: [
      ['Build and maintain a 30-day running streak', 38, 30],
      ['Read 25 books', 1, 25],
      ['Quit all algorithmic feeds', 1, 1],
      ['End the year with more money than I started', 0, 1],
      ['Complete the 9+1 program to run the 2027 NYC Marathon', 1, 10],
      ['Build and maintain an 8-week gym streak', 0, 8],
      [
        'Check 3 items off my bucket list',
        bucketListGoalsPerYear.get('2026') ?? 0,
        3,
      ],
      ['Get a new job', 0, 1],
      ['Make the most of NYC', 0, 1],
    ],
  },
}
