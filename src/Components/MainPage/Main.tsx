import React from 'react'
import MainDisplay from './MainDisplay'
import MainSearch from './MainSearch'
import { useTheme } from '../../Hooks/useTheme';

const Main = () => {
  const { theme } = useTheme();
  return (
    <div className={`h-[calc(100vh-148px)] ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <MainSearch />
      <MainDisplay />
    </div>
  )
}

export default Main