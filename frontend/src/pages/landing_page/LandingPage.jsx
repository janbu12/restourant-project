import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../component/Navbar'
import supabase from '../../hooks/supabaseClient';

export default function LandingPage() {
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
      <Navbar/>
      <div className='bg-slate-50 w-full h-auto' id='menu'>
        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
          <div className='flex flex-wrap justify-center items-center my-5'>
            {menu.map((item, index) => (
              <div key={index} className='w-1/2 md:w-1/3
              laptop:w-1/4 xl:w-1/5 p-4'>
                <div className='flex flex-col bg-white rounded-lg shadow-md p-4 gap-3'>
                  <h2 className='text-lg font-bold'>{item.name}</h2>
                  <p className='text-sm text-justify'>{item.description}</p>
                  <p className='text-sm text-sky-600'>Rp. {item.price}</p>
                  <Link to={`/menu/${item.id}`} className='text-sm text-blue-500 hover:text
                  -blue-700'></Link>
                </div>
              </div>
              ))}
          </div>
        )
        }
      </div>
      {/* <div className='bg-red-500 w-full h-screen' id='home'>

      </div> */}
    </>
  )
}
