import { Link } from 'wouter'

const CharlottesBirthday = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100'>
      <div className='space-y-8 text-center'>
        <h1 className='mb-8 text-4xl font-bold text-purple-800'>
          Charlotte's Birthday 🎉
        </h1>
        <div className='space-y-4'>
          <Link
            href='/charlottes-bday/breakfast'
            className='block rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 shadow-md transition-colors duration-200 hover:bg-pink-50'>
            Breakfast Menu
          </Link>
          <Link
            href='/charlottes-bday/drinks'
            className='block rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 shadow-md transition-colors duration-200 hover:bg-pink-50'>
            Drinks Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CharlottesBirthday
