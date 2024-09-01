import React, { useEffect, useState } from 'react';
import supabase from '../hooks/supabaseClient';

export default function PartnerAdmin() {
  const [partner, setPartner] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Menambahkan state loading
  // const token = localStorage.getItem("accessToken");

  const getPartner = async (token) => {
    try {
      setIsLoading(true); // Mulai loading
      if (!token) {
        console.error('No access token found');
        return;
      }
      const response = await fetch("https://restourant-project-backend.vercel.app/api/partner", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      console.log('Data fetched:', data);
      setPartner(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
  
      if (token) {
        await getPartner(token); // Fetch data hanya jika token ada
      }
    };
  
    fetchData();
    
    // Supabase channel setup
    const channel = supabase
      .channel('public:partner')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'partner' }, 
        payload => {
          console.log('Change received!', payload);
          getPartner(); 
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Tetap tidak ada dependensi
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-24'>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>message</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {partner.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              <td>{item.message}</td>
              <td>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
