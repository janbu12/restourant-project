import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../hooks/supabaseClient';
import Swal from 'sweetalert2';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeOfPassword, setTypeOfPassword] = useState('password');
    const [isLoading, setIsLoading] = useState(false);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'button-alert-con ml-1',
          cancelButton: 'button-alert-can mr-1'
        },
        buttonsStyling: false
      });

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        if (typeOfPassword === 'password') {
            setTypeOfPassword('text');
            } else {
                setTypeOfPassword('password');
            }
        }

    const handleClick = () => {
        handleShowPassword();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        setIsLoading(true);
        const response = await fetch('https://restourant-project-backend.vercel.app/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            swalWithBootstrapButtons.fire({
                text:'Anda berhasil Login',
                icon:'success',
                showConfirmButton:false,
                timer:1000
            })

            const {accessToken, email, refreshToken} = result
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('email', email);
            localStorage.setItem('refreshToken', refreshToken);

            navigate('/admin');
          } else {
            swalWithBootstrapButtons.fire({
                title:'Error',
                text:'Invalid email or password',
                icon:'error',
                showConfirmButton:false,
                timer:1000
          })
          }
        setIsLoading(false);
    }

  return (
    <div className='w-full h-screen bg-slate-50 flex justify-center items-center'>
        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
        <form
            onSubmit={handleSubmit} 
            className='flex flex-col items-center w-auto phone:min-w-[90%] laptop:min-w-[450px] tablet:min-w-[70%] h-auto bg-white rounded-lg drop-shadow-lg gap-6'
        >
            <div className='w-full bg-orange-950 text-slate-50 py-5 rounded-tl-lg rounded-tr-lg'>
                <h2 className='text-center text-xl font-medium'>Admin</h2>
            </div>
            <div className='flex flex-col w-full px-8 gap-4 laptop:my-4 laptop:px-16'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={handleEmail} className="w-full p-2 border border-gray-400 rounded" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Password</label>
                    <input type={typeOfPassword} value={password} onChange={handlePassword} className="w-full p-2 border border-gray-400 rounded" />
                </div>
                <div className='flex gap-2'>
                        <input type="checkbox" className='hover:cursor-pointer' onClick={handleClick}/><label htmlFor="">Show Password</label>
                </div>
            </div>
            <div className='flex w-full pb-5'>
                <button 
                    type='submit' 
                    className='bg-orange-950 w-full mx-8 laptop:mx-16 text-white py-3 rounded-lg hover:bg-orange-800 transition-all duration-300'
                >
                    Login
                </button>
            </div>
        </form>
        )}
    </div>
  )
}
