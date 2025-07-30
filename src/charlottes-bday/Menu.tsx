import React from 'react'

type MenuItem = {
  type: 'item'
  name: string
  description?: string
}

type SectionHeader = {
  type: 'header'
  title: string
}

type MenuElement = MenuItem | SectionHeader

interface MenuProps {
  items: MenuElement[]
  title?: string
}

const Menu: React.FC<MenuProps> = ({ items, title }) => {
  return (
    <div className='rounded-lg bg-white p-8 shadow-lg'>
      {title && (
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
          {title}
        </h2>
      )}

      <div className='space-y-6'>
        {items.map((item, index) => {
          if (item.type === 'header') {
            return (
              <div key={index} className='border-b-2 border-gray-200 pb-2'>
                <h3 className='max-w-full whitespace-pre-wrap text-xl font-semibold text-gray-700'>
                  {item.title}
                </h3>
              </div>
            )
          } else {
            return (
              <div
                key={index}
                className='flex items-start justify-between border-b border-gray-100 py-3 last:border-b-0'>
                <div className='flex-1'>
                  <h4 className='mb-1 max-w-full whitespace-pre-wrap font-medium text-gray-800'>
                    {item.name}
                  </h4>
                  {item.description && (
                    <p className='whitespace-pre-wrap text-sm leading-relaxed text-gray-600'>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Menu
