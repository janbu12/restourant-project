import React from 'react'

export default function Navbar() {
  return (
    <div className='laptop:flex w-full h-auto laptop:justify-between laptop:items-center bg-white drop-shadow-md py-2 px-24'>
       <div className=''>
        <h2 className='text-lg font-bold text-orange-950'>Logo.</h2>
       </div>
       <div className='laptop:flex gap-2 '>
        <a href="#home" className='laptop:nav-link'>Home</a>
        <a href="#menu" className='laptop:nav-link'>Menu</a>
        <a href="#" className='laptop:nav-link'>About Us</a>
        <a href="#partner" className='laptop:nav-link'>Partner</a>
        <a href="#" className='laptop:nav-link'>Career</a>
       </div>
       <div className=''>
       </div>
    </div>
  )
}
