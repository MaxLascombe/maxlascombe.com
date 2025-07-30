import { QRCodeSVG } from 'qrcode.react'
import Menu from './Menu'

const Drinks = () => {
  const drinksItems = [
    { type: 'header' as const, title: 'Cocktails' },
    {
      type: 'item' as const,
      name: 'Hugo Spritz',
      description: 'Prosecco, St. Germain, club soda, and a strawberry garnish',
    },
    {
      type: 'item' as const,
      name: 'Moscow Mule',
      description:
        'Vodka, ginger beer, lime wedge, candied pineapple or ginger garnish',
    },
    {
      type: 'item' as const,
      name: 'White Claw',
      description: 'Variety pack #2',
    },
    { type: 'header' as const, title: 'Snacks' },
    {
      type: 'item' as const,
      name: 'Goldfish',
      description: '',
    },
    {
      type: 'item' as const,
      name: 'Cheez-it',
    },
    {
      type: 'item' as const,
      name: 'Anything else we happen to bring on the boat rersdf rsedf',
    },
  ]

  const currentUrl = window.location.href

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-center text-4xl font-bold text-blue-800'>
          Drinks Menu 🍹
        </h1>

        <Menu items={drinksItems} />

        <div className='mt-12 max-w-full text-center'>
          <div className='inline-block max-w-full rounded-lg bg-white p-6 shadow-lg'>
            <h3 className='mb-4 max-w-full whitespace-pre-wrap text-lg font-semibold text-gray-800'>
              Scan to view this menu on your phone
            </h3>
            <QRCodeSVG
              value={currentUrl}
              size={200}
              level='M'
              className='mx-auto'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drinks
