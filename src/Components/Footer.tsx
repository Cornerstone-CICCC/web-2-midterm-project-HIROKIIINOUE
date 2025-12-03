import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <div className='h-[68px] bg-gray-200'>
      <p className='h-[50%] w-[60%] mx-auto flex items-center justify-center gap-2'>
        <CopyrightIcon />
        2025 Hiroki Inoue
      </p>
      <p className='h-[50%] w-[60%] mx-auto flex items-center justify-center gap-2'>
        <EmailIcon />
        <a href="mailto:tyynh.hiroki@gmail.com">tyynh.hiroki@gmail.com</a>
      </p>
    </div>
  )
}

export default Footer