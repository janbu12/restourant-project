import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('Logout successful');
            localStorage.clear();
            navigate('/login');
        } else {
            console.error('Logout failed:', result.error);
        }
    };
  return (
    <div>
        Admin
        <button onClick={handleLogout} className='button-alert-con'>Logout</button>
    </div>
  )
}
