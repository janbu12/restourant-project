import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../component/Navbar'
import supabase from '../../hooks/supabaseClient';
import Swal from 'sweetalert2';

export default function LandingPage() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const maxLength = 255;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button-alert-con ml-1',
      cancelButton: 'button-alert-can mr-1'
    },
    buttonsStyling: false
  });
  
  async function getMenu(){
    setLoading(true);

    const response = await fetch('https://restourant-project-backend.vercel.app/api/menu');
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

  const handleInputPartner = () => {
    setEmail("");
    setName("");
    setPhone("");
    setText('');
  }

  async function handleSubmitPartner() {
    const data = {
      name: name,
      email: email,
      phone_number: phone,
      message: text
    };
  
    try {
      setLoading(true);
      const response = await fetch('https://restourant-project-backend.vercel.app/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      swalWithBootstrapButtons.fire({
        title: "Send Partner!",
        text: "Send Partner Message Has Successfully!",
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'button-alert-con ml-1',
          cancelButton: 'button-alert-can mr-1'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          handleInputPartner();
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
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
      <div className='bg-slate-50 w-full h-auto laptop:my-12 phone:px-8 laptop:px-24  phone:mt-24' id='menu'>
        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
          <>
          <div className='mb-6'>
            <h2 className='laptop:text-7xl phone:text-5xl font-semibold text-orange-700'>Our <span className='text-orange-950'>Menu!</span></h2>
          </div>
          <div className='flex flex-wrap justify-between items-center gap-5'>
            {menu.map((item, index) => (
              <div key={index} className='w-1/2 phone:w-full md:w-1/3
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
      <div className='w-full phone:px-8 laptop:px-24 py-8' id='partner'>
        <div className='flex laptop:flex-row phone:flex-col laptop:justify-between laptop:items-center laptop:gap-6'>
          <div className='flex flex-col laptop:w-max-80% gap-12'>
            <div className='flex flex-col w-full laptop:hidden phone:block '>
              <img src="./partner.jpeg" alt="partner.jpg" className='rounded-xl drop-shadow w-full max-h-72 object-cover' />
            </div>
            <div className='flex flex-col'>
              <h2 className='laptop:text-7xl font-medium text-orange-950 phone:text-5xl'>Partnership</h2>
              <h2 className='mb-3 laptop:text-5xl font-medium text-orange-700 phone:text-3xl'>Opportunity!</h2>
              <p className='laptop:text-lg phone:text-base'>Sampaikan bagaimana kami bisa bekerja sama untuk mencapai tujuan Anda.</p>
            </div>
            <form className='flex flex-col gap-3' onSubmit={handleSubmitPartner}>
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
                  value={text} 
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
                  type='submit'
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className='flex laptop:block phone:hidden'>
            <img src="./partner.jpeg" alt="partner.jpg" className='rounded-xl drop-shadow-lg max-h-[900px]' />
          </div>
        </div>
      </div>
    </>
  )
}
