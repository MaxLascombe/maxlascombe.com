type Header = string
type Title = string
export type Date = `${number}-${number}-${number}`

export const goals: (Header | [Title, Date | 'thisyear' | null])[] = [
  'Travel',
  ['Live for a year in a new country (not France or the US)', '2025-01-14'],
  ['Travel to South America', null],
  ['Travel to Africa', null],
  ['Travel to Oceania', 'thisyear'],
  ['Visit Antarctica', null],
  ['See the Taj Mahal', null],
  ['See Machu Picchu', null],
  ['See the Pyramids of Giza', null],
  ['Road trip across the US with friends', null],
  ['Visit every European country', null],
  ['Go to Vegas for a weekend', null],
  ['Go to the Carnival of Brazil', null],
  ['Have pizza in Naples', null],
  ['Take a 24+ hour train', null],
  ['Do a week-long biking trip', null],
  ['Take a helicopter ride over New York', null],
  ['Have omakase in Tokyo', '2024-12-10'],
  ['Ride a camel in the Sahara desert', null],
  ['See the heads on Easter Island', null],
  ['Swim in the hot springs of Iceland', null],
  ['Take a train across the US', null],
  ['Go to Monaco for the F1 Grand Prix', null],
  ['Go on a safari', null],
  ['Do a meditation retreat', null],
  ['Eat a bahn mi in Hanoi', '2024-04-20'],
  ['Eat tacos in Mexico City ', '2023-09-10'],
  ['Go skiing/snowboarding in the US', null],
  ['Go scuba diving at the Great Barrier Reef', 'thisyear'],
  ['Spend a month in a US national park', null],
  ['Do a food tour of Italy', null],
  ['See Kangaroos or Koalas in Australia', 'thisyear'],
  ['Climb Mount Fuji', 'thisyear'],
  ['Travel through Asia for six months', '2024-07-12'],
  'Physical feats',
  ['Go skydiving', null],
  ['Go bungee jumping', null],
  ['Do a triathlon', '2023-05-13'],
  ['Complete an Iron Man', null],
  ['Complete an eating challenge', null],
  ['Surf a 3-foot wave', 'thisyear'],
  ['Do ten pull-ups in a row', 'thisyear'],
  ['Compete in a boxing match', null],
  ['Run a 5k in under 25 minutes', 'thisyear'],
  ['Run a sub-4-hour marathon', null],
  ['Run a 10k in under 50 minutes', 'thisyear'],
  ['Run the NYC marathon', '2023-11-05'],
  ['Run the Paris Marathon', null],
  ['Kayak down the Colorado river', null],
  ['Kayak down the Seine', null],
  ['Bike from Lille to Marseille ', null],
  ['Do a kickflip', null],
  ['Go cliff jumping', '2024-08-31'],
  ['Do an entire training program for a race with a friend', '2023-05-11'],
  ['Go kite surfing', 'thisyear'],
  'Creative goals',
  ['Write a book', null],
  ['Sell an artwork', null],
  ['Post my 100th video on YouTube', null],
  ['Build my personal website to archive all that I create', '2023-02-26'],
  ['Send out my 100th newsletter', null],
  ['Create a short film', null],
  ['Start a podcast', null],
  ['Create a public art installation in NYC (guerrilla art)', null],
  ['Create a font', '2023-12-17'],
  ['Start a creative brand', null],
  ['Build a piece of furniture out of wood', '2023-12-14'],
  ['Make an outfit from scratch', null],
  ['Paint a 25-square-foot painting', null],
  ['Livestream a total of 100 hours', null],
  ['Publish a video game', null],
  'Goals that require some money',
  ['Eat at a 3 Michelin star restaurant', '2024-12-10'],
  ['Open a restaurant', null],
  ['Buy a home', null],
  ['Put $1000 on a color in roulette', null],
  ['Fly first class', null],
  ['Own a lavender field', null],
  ['Sponsor a friend’s creative endeavor ', null],
  ['Open an art gallery', null],
  ['Open a food truck', null],
  ['Donate to help 100 dogs get adopted', null],
  'Miscellaneous',
  ['Make avocado toast from an avocado I grew from a pit', null],
  ['Read 1000 books', null],
  ['Work for a big tech company', null],
  ['Donate blood 30 times', null],
  ['Do a week-long tech detox', null],
  ['Get comfortable speaking in a new language', null],
  ['Donate 1% of any money I make', null],
  ['Go to a movie festival', '2023-10-12'],
  ['Organize a party for 300+ people', null],
  ['Get coffee with 30 strangers', null],
  ['Go to a 24+ hour party ', null],
  ['Go to a nude beach', null],
  ['Catch a large fish', null],
  ['Go swimming with sharks', 'thisyear'],
  ['Make beer from scratch ', null],
  ['Make my own wine', null],
  ['Contribute to an open-source project', null],
  ['Create a small power generator', null],
  ['Coach someone to help them achieve their goals', null],
  ['Work for / create a nonprofit', null],
  ['Become a teacher of some kind', null],
  ['Become a mentor to someone', null],
]
