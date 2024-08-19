import React from 'react'

export default function Login() {
  return (
    <div className='w-full h-screen bg-slate-50 flex justify-center items-center'>
        <div 
            className='flex flex-col items-center w-auto phone:min-w-[90%] h-auto bg-white rounded-lg drop-shadow-lg gap-8'>
            <div className='w-full border-b-2 py-5'>
                <h2 className='text-center text-xl font-medium'>Login</h2>
            </div>
            <div className='flex flex-col w-full px-8 gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Username</label>
                    <input type="text" className="w-full p-2 border border-gray-400 rounded" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Password</label>
                    <input type="password" className="w-full p-2 border border-gray-400 rounded" />
                </div>
            </div>
            <div className='flex w-full py-5 border-t-2'>
                <button className='bg-sky-800 w-full mx-8 text-white py-3 px-6 rounded-lg'>Login</button>
            </div>
        </div>
    </div>
  )
}
