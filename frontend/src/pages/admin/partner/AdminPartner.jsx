import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../../component/NavbarAdmin';
import PartnerAdmin from '../../../component/PartnerAdmin';
import NavigationHp from '../../../component/NavigationHp';

export default function AdminPartner() {
    
  return (
    <>
        <NavbarAdmin />
        <PartnerAdmin/>
        <NavigationHp/>
        {/* <button onClick={handleLogout} className='button-alert-con'>Logout</button> */}
    </>
  )
}
