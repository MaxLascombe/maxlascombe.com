import { QRCodeSVG } from 'qrcode.react'
import Menu from './Menu'

const Breakfast = () => {
  const breakfastItems = [
    { type: 'header' as const, title: 'Hibachi Breakfast' },
    {
      type: 'item' as const,
      name: 'Pancakes with your choice of toppings',
      description:
        'Blueberries, strawberries, bananas, chocolate chips, whipped cream, syrup',
    },
    {
      type: 'item' as const,
      name: 'Eggs any style',
      description: 'Sunny side up, over easy, scrambled',
    },
    {
      type: 'item' as const,
      name: 'Breakfast potatoes',
      description: 'Sautéed seasoned potatoes',
    },
    {
      type: 'item' as const,
      name: 'Bacon',
      description: "It's just bacon",
    },
    { type: 'header' as const, title: 'Drinks' },
    {
      type: 'item' as const,
      name: 'Espresso',
    },
    {
      type: 'item' as const,
      name: 'Latte (hot or iced)',
      description: 'Choice of milk: dairy, oat, almond',
    },
    {
      type: 'item' as const,
      name: 'London Fog (hot or iced)',
      description:
        'Earl grey latte with vanilla and lavender infused maple syrup',
    },
    {
      type: 'item' as const,
      name: 'Matcha Latte (hot or iced)',
    },
  ]

  const currentUrl = window.location.href

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 p-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-center text-4xl font-bold text-orange-800'>
          Breakfast Menu 🍳
        </h1>

        <Menu items={breakfastItems} />

        <div className='mt-12 max-w-full text-center'>
          <div className='inline-block max-w-full rounded-lg bg-white p-6 shadow-lg'>
            <h3 className='mb-4 max-w-full whitespace-pre-wrap text-lg font-semibold text-gray-800'>
              Scan to view this menu on your phone
            </h3>
            <QRCodeSVG
              value={currentUrl}
              size={200}
              level='M'
              includeMargin={true}
              className='mx-auto'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breakfast
