import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../component/NavbarAdmin';
import PartnerAdmin from '../../component/PartnerAdmin';

export default function Admin() {
    
  return (
    <>
        <NavbarAdmin />
        <PartnerAdmin/>
        {/* <button onClick={handleLogout} className='button-alert-con'>Logout</button> */}
    </>
  )
}
