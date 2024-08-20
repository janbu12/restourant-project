import React, { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='phone:hidden laptop:flex w-full h-auto laptop:justify-between laptop:items-center bg-white drop-shadow-md py-2 px-24'>
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
      <div className='phone:flex laptop:hidden w-full h-auto justify-between items-center fixed z-50 top-0 bg-white drop-shadow-md py-3 px-8'>
        <div className=''>
            <h2 className='text-2xl font-bold text-orange-950'>Logo.</h2>
        </div>
        <div>
          <button 
            onClick={toggleMenu}
            className={`flex outline-none ${isMenuOpen ?"text-orange-700":"text-orange-950"} transition-all duration-200`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='size-10'>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      <div 
        className={`phone:flex laptop:hidden w-full bg-white drop-shadow-md py-2 px-8 fixed top-0 right-0 z-30 ${isMenuOpen ? 'animate-slide-in' : 'animate-slide-out'}`}>
        <div className='flex flex-col w-full justify-center items-center mt-20 gap-3 text-orange-950'>
          <a href="#home" className='text-center marker:py-2 text-lg font-bold' onClick={toggleMenu}>Home</a>
          <a href="#menu" className='text-center py-2 text-lg font-bold' onClick={toggleMenu}>Menu</a>
          <a href="#" className='text-center py-2 text-lg font-bold' onClick={toggleMenu}>About Us</a>
          <a href="#partner" className='py-2 text-lg font-bold' onClick={toggleMenu}>Partner</a>
          <a href="#" className='text-center py-2 text-lg font-bold' onClick={toggleMenu}>Career</a>
        </div>
      </div>
    </>
  )
}
