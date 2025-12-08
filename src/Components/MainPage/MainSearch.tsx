import React from 'react'
import SearchBar from '../SearchBar'

const MainSearch = () => {
  return (
    <div className='h-[30%] flex items-center'>
      <div className='h-[60px]  md:w-[60%] w-[90%] mx-auto flex justify-center'>
        <SearchBar />
      </div>
    </div>
  )
}

export default MainSearch