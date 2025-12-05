import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className='h-[100px]'>
      <div className='flex h-[55%] justify-around items-center bg-gray-200'>
        <img src="vite.svg" alt="" width={40} height={40} className='text-[40px]' />
        <h1 className='text-[16px] md:text-[32px] min-[425px]:text-[24px] font-bold'>Customize Movie List</h1>
        <button type='button' className='text-[40px] '>🌙</button>
      </div>
      <div className='h-[45%] flex justify-center bg-gray-300'>
        <SearchBar />
      </div>

    </header>
  )
}

export default Header