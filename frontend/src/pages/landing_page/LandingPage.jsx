import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../component/Navbar'
import supabase from '../../hooks/supabaseClient';

export default function LandingPage() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const maxLength = 255;
  
  async function getMenu(){
    setLoading(true);

    const response = await fetch('http://localhost:3000/api/menu');
    const {data} = await response.json();

    setMenu(data);
    setLoading(false);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePhone = (e) => {
    const { value } = e.target;
    // Menghapus karakter non-numerik
    const filteredValue = value.replace(/[^0-9]/g, '');
    setPhone(filteredValue);
  }

  const handleChangeMessage = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

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
      <div className='bg-slate-50 w-full h-auto my-12 px-24' id='menu'>
        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
          <>
          <div className='mb-6'>
            <h2 className='text-7xl font-semibold text-orange-700'>Our <span className='text-orange-950'>Menu!</span></h2>
          </div>
          <div className='flex flex-wrap justify-around items-center gap-5'>
            {menu.map((item, index) => (
              <div key={index} className='w-1/2 md:w-1/3
              laptop:w-1/5 xl:w-1/5'>
                <div className='flex flex-col bg-white rounded-lg shadow-md p-4 gap-3 laptop:min-h-80 laptop:max-h-80 justify-center'>
                  <h2 className='text-lg font-semibold text-orange-950'>{item.name}</h2>
                  <p className='text-sm text-justify'>{item.description}</p>
                  <p className='text-sm text-orange-700'>Rp. {item.price}</p>
                  <Link to={`/menu/${item.id}`} className='text-sm text-blue-500 hover:text
                  -blue-700'></Link>
                </div>
              </div>
              ))}
          </div>
          </>
        )
        }
      </div>
      {/* <div className='bg-red-500 w-full h-screen' id='home'>

      </div> */}
      <div className='w-full px-24 py-8' id='partner'>
        <div className='flex justify-center items-center gap-24'>
          <div className='flex flex-col w-1/2 gap-12'>
            <div className='flex flex-col'>
              <h2 className='text-7xl font-medium text-orange-950'>Partnership</h2>
              <h2 className='mb-3 text-5xl font-medium text-orange-700'>Opportunity!</h2>
              <p className='text-lg'>Sampaikan bagaimana kami bisa bekerja sama untuk mencapai tujuan Anda.</p>
            </div>
            <form className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Name</label>
                <input
                  required 
                  type="text" 
                  className="w-full py-2 px-4 border border-gray-400 rounded" 
                  value={name}
                  onChange={handleChangeName}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Email</label>
                <input
                  required
                  type="email" 
                  className="w-full py-2 px-4 border border-gray-400 rounded"
                  value={email}
                  onChange={handleChangeEmail}
                  title="Please enter a valid email address" 
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Phone Number</label>
                <input
                  required
                  type="text" 
                  className="w-full py-2 px-4 border border-gray-400 rounded"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Message</label>
                <textarea
                  required 
                  className='resize-none w-full py-2 px-4 border border-gray-400 rounded' 
                  name="" 
                  id="" 
                  rows="8"
                  onChange={handleChangeMessage}
                ></textarea>
                <div>
                  <p>{text.length} / {maxLength} Character</p>
                </div>
              </div>
              <div>
                <button
                  className='bg-orange-700 py-3 w-full rounded-xl text-white hover:bg-orange-800 transition-all duration-300'
                  type='sumbit'
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className='flex flex-col w-1/2'>
            <img src="./partner.jpeg" alt="partner.jpg" className='rounded-xl drop-shadow-lg max-h-[900px]' />
          </div>
        </div>
      </div>
    </>
  )
}
