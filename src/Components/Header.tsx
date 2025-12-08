import React from 'react'
import { useTheme } from '../Hooks/useTheme'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='h-[80px] shadow-2xl relative z-10 '>
      <div
        className={`flex h-full justify-around items-center transition-colors ${theme === 'dark' ? 'bg-black text-red-700' : 'bg-gray-300 text-red-500'
          }`}
      >
        <img src="filmLogo.png" alt="" width={45} height={45} className='text-[40px] rounded-full' />
        <h1 className='text-[22px] md:text-[42px] min-[425px]:text-[32px] font-bold font-serif'>Slide Movie List</h1>
        {theme === "dark" ? (
          <button type='button' className='cursor-pointer' onClick={toggleTheme}><LightModeIcon fontSize='large' /></button>
        ) : (
          <button type='button' className='cursor-pointer text-amber-500' onClick={toggleTheme}><DarkModeIcon fontSize='large' /></button>
        )}
      </div>
    </header>
  )
}

export default Header
