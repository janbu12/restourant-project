import React, { useEffect, useState } from 'react';
import supabase from '../hooks/supabaseClient';

export default function PartnerAdmin() {
  const [partner, setPartner] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk mengontrol loading

  const getPartner = async () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      console.warn("Token is not available");
      return;
    }
  
    if (isLoading) { // Jika sedang loading, return saja
      console.log('Fetch is already in progress. Skipping this request.');
      return;
    }
  
    setIsLoading(true); // Set loading state
  
    try {
      const response = await fetch("https://restourant-project-backend.vercel.app/api/partner", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const { data } = await response.json();
      console.log('Data fetched:', data); // Debugging output
      setPartner(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    console.log("useEffect is triggered");
    const token = localStorage.getItem("accessToken");
  
    if (token) {
      console.log("Token found, fetching partner data.");
      getPartner(); // Fetch data hanya jika token ada
    } else {
      console.log("No token found, skipping fetch.");
    }
  
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
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, []); // Hanya on mount
  
  

  return (
    <>
    {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
            -b-2 border-gray-900">
              </div>
          </div>
        ) : (
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
        )}
    </>
  );
}
