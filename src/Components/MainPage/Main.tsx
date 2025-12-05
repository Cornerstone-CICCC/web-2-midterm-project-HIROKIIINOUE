import React from 'react'
import MainSort from './MainSort'
import MainDisplay from './MainDisplay'

const Main = () => {
  return (
    <div className='h-[calc(100vh-168px)]'>
      <MainSort />
      <MainDisplay />
    </div>
  )
}

export default Main