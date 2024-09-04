import React, { useEffect, useState } from 'react';
import supabase from '../hooks/supabaseClient';
import FormMenu from './FormMenu'; // Import komponen baru

export default function MenuAdmin() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', price: '', photo: '' });
  const [isEditing, setIsEditing] = useState(false); // New state to determine if editing
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission

  // Function to fetch menu
  async function getMenu() {
    setLoading(true);

    const response = await fetch('https://restourant-project-backend.vercel.app/api/menu');
    const { data } = await response.json();

    setMenu(data);
    setLoading(false);
  }

  useEffect(() => {
    getMenu();

    const channel = supabase.channel('public:menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu' }, payload => {
        console.log('Change received!', payload);
        getMenu();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to handle Add or Edit button click
  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({ ...item }); // Fill form with existing data if editing
      setIsEditing(true); // Set editing mode
    } else {
      setFormData({ id: null, name: '', description: '', price: '', photo: '' }); // Reset form if adding new
      setIsEditing(false); // Set add mode
    }
    setIsModalOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] }); // Set file if photo input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    const token = localStorage.getItem("accessToken");

    
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('description', formData.description);
    newFormData.append('price', formData.price);
    if (formData.photo) {
      newFormData.append('photo', formData.photo);
    }

    try {
      const url = isEditing 
        ? `https://restourant-project-backend.vercel.app/api/menu/${formData.id}` 
        : 'https://restourant-project-backend.vercel.app/api/menu';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // },
        body: newFormData
      });
      
      const result = await response.json();
      
      if (result.success) {
        getMenu(); // Refresh menu
        setIsModalOpen(false); // Close modal
        console.log(result);
      } else {
        console.error(`Error ${isEditing ? 'updating' : 'adding'} menu:`, result.error);
        console.log(result);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className='bg-slate-50 w-full h-auto laptop:my-12 phone:px-8 laptop:px-24 laptop:mt-24 phone:mt-24 phone:mb-24' id='menu'>
            <div className='mb-8 flex laptop:flex-row phone:flex-col justify-between phone:gap-6 laptop:items-center phone:items-start'>
              <h2 className='laptop:text-3xl phone:text-5xl font-semibold text-orange-700'>Manage <span className='text-orange-950'>Menu</span></h2>
              <button className='button-alert-con laptop:text-xl phone:text-base' onClick={() => handleOpenModal()}>Add Menu</button>
            </div>
            <div className='flex flex-wrap justify-between items-center gap-5'>
              {menu.map((item, index) => (
                <div key={index} className='w-1/2 phone:w-full md:w-1/3 laptop:w-1/5 xl:w-1/5'>
                  <div className='flex flex-col bg-white rounded-lg shadow-md p-4 gap-3 laptop:h-[450px] laptop:max-h-[450px] justify-between'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-lg font-semibold text-orange-950'>{item.name}</h2>
                      <button className='text-orange-950 hover:bg-orange-100 p-1 rounded-lg transition-all duration-300' onClick={() => handleOpenModal(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <img src={item.photo} alt={item.name} className='w-full h-32 object-cover rounded-md' />
                    </div>
                    <p className='text-sm text-justify'>{item.description}</p>
                    <p className='text-lg font-medium text-orange-700'>Rp. {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Form Modal */}
          <FormMenu 
            isOpen={isModalOpen} 
            formData={formData} 
            onClose={() => setIsModalOpen(false)} 
            onChange={handleInputChange} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} // Pass the loading state
          />
        </>
      )}
    </>
  );
}
