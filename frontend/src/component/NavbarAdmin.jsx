import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NavbarAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    const email = localStorage.getItem("email");

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'button-alert-con ml-1',
          cancelButton: 'button-alert-can mr-1'
        },
        buttonsStyling: false
      });

    const navigate = useNavigate();

    const isActive = (path) => {
        // Handle the case when pathname is '/' and hash is empty
        console.log(location.pathname)
        return location.pathname === path;
      };

    const handleLogout = async () => {
        setIsLoading(true);
        const response = await fetch('https://restourant-project-backend.vercel.app/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        
        if (response.ok) {
            setIsLoading(false);
            
            swalWithBootstrapButtons.fire({
                text:'Anda berhasil Logout',
                icon:'success',
                showConfirmButton:false,
                timer:1000
            })
            localStorage.clear();
            navigate('/login');
        } else {
            setIsLoading(false);
            console.error('Logout failed:', result.error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
    <>
    {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
            <>
        <div className='flex justify-between fixed top-0 z-50 items-center w-full bg-white drop-shadow-md py-2.5 px-12'>
            <div className='text-xl font-bold text-orange-950'>
                <h2>Logo.</h2>
            </div>
            <div className='laptop:flex phone:hidden gap-2 '>
                <Link to="/admin/menu" className={`laptop:nav-link ${isActive('/admin/menu') ? 'text-orange-700 text-lg' : ''}`}>Menu</Link>
                <Link to="/admin/partner" className={`laptop:nav-link ${isActive('/admin/partner') ? 'text-orange-700 text-lg' : ''}`}>Partner</Link>
                <Link to="/admin/article" className={`laptop:nav-link ${isActive('/admin/article') ? 'text-orange-700 text-lg' : ''}`}>Article</Link>
            </div>
            <div className='flex gap-3 items-center text-orange-950'>
                {/* <h2>{email}</h2> */}
                <button onClick={toggleMenu} className={`rounded-full px-2 py-2 hover:bg-orange-50 transition-all duration-300 ${isMenuOpen ?"bg-orange-50":"bg-orange-100"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </button>
                <button className='flex bg-orange-100 hover:bg-orange-50 px-2 py-2 rounded-full transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden    ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                </button>
            </div>
        </div>

        <div 
            className={` w-auto bg-white drop-shadow-md py-2 px-8 fixed top-0 right-14 z-30 rounded-lg ${isMenuOpen ? 'animate-slide-in' : 'animate-slide-out'}`}>
            <div className='flex flex-col w-full justify-center items-center mt-20 gap-3 text-orange-950'>
            <Link 
                to={"/"} 
                className='text-center marker:py-2 phone:text-lg font-medium laptop:text-base  hover:text-orange-700 transition-all duration-200' 
                onClick={toggleMenu}
                >
                    Account
                </Link>
            <button 
                className='text-center py-2 phone:text-lg font-medium laptop:text-base hover:text-orange-700 transition-all duration-200' 
                onClick={handleLogout}
            >
                    Logout
                </button>
            </div>
        </div>
        </>
        )}
    </>

  )
}
