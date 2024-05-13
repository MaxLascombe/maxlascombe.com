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
      ['Publish 42 creations (including newsletters)', 2, 42],
      ['Read 25 books', 6, 25],
      ['Meditate 250 times', 91, 250],
      ['Do 36,500 pushups', 10_010, 36_500],
      ['Do 100 endurance workouts', 31, 100],
      [
        'Check seven items off my bucket list',
        bucketListGoalsPerYear.get('2024') ?? 0,
        7,
      ],
      ['Travel to five different countries', 4, 5],
      ['Have a conversation in Tagalog', 0, 1],
      ['Complete all 16 of my work milestones', 5, 16],
    ],
  },
}
