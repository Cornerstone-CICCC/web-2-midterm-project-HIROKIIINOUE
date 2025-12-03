import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className='h-[160px]'>
      <div className='flex h-[65%] justify-around items-center  bg-gray-200'>
        <img src="vite.svg" alt="" width={40} height={40} className='text-[40px]' />
        <h1 className='text-[36px] font-bold'>Customize Movie Recommendation</h1>
        <button type='button' className='text-[40px]'>🌙</button>
      </div>
      <div className='h-[35%] flex justify-center bg-gray-300'>
        <SearchBar />
      </div>

    </header>
  )
}

export default Header