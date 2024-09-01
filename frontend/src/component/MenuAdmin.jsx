import React, { useEffect, useState } from 'react'
import supabase from '../hooks/supabaseClient';
import { Link } from 'react-router-dom';

export default function MenuAdmin() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function getMenu(){
    setLoading(true);

    const response = await fetch('https://restourant-project-backend.vercel.app/api/menu');
    const {data} = await response.json();

    setMenu(data);
    setLoading(false);
  }

  useEffect(()=>{
    getMenu();

    const channel = supabase.channel('public:menu') // Ganti dengan nama channel Anda
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu' }, payload => {
        console.log('Change received!', payload);
        getMenu(); // Update state menu jika data berubah
      })
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  },[])

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
            <div className='bg-slate-50 w-full h-auto laptop:my-12 phone:px-8 laptop:px-24 laptop:mt-24  phone:mt-24 phone:mb-24' id='menu'>
                <div className='mb-8 flex laptop:flex-row phone:flex-col justify-between phone:gap-6 laptop:items-center phone:items-start'>
                    <h2 className='laptop:text-3xl phone:text-5xl font-semibold text-orange-700'>Manage <span className='text-orange-950'>Menu</span></h2>
                    <button className='button-alert-con laptop:text-xl phone:text-base'>Add Menu</button>
                </div>
                <div className='flex flex-wrap justify-between items-center gap-5'>
                {menu.map((item, index) => (
                    <div key={index} className='w-1/2 phone:w-full md:w-1/3
                    laptop:w-1/5 xl:w-1/5'>
                    <div className='flex flex-col bg-white rounded-lg shadow-md p-4 gap-3 laptop:min-h-80 laptop:max-h-80 justify-center'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-semibold text-orange-950'>{item.name}</h2>
                            <button className='text-orange-950 hover:bg-orange-100 p-1 rounded-lg transition-all duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <p className='text-sm text-justify'>{item.description}</p>
                        <p className='text-sm text-orange-700'>Rp. {item.price}</p>
                        {/* <Link to={`/menu/${item.id}`} className='text-sm text-blue-500 hover:text-blue-700'></Link> */}
                    </div>
                    </div>
                    ))}
                </div>
            </div>
            </>
        )}
    </>
  )
}
