import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../../component/NavbarAdmin';
import MenuAdmin from '../../../component/MenuAdmin';
import NavigationHp from '../../../component/NavigationHp';

export default function AdminMenu() {
    
  return (
    <>
        <NavbarAdmin />
        <MenuAdmin/>
        <NavigationHp/>
        {/* <button onClick={handleLogout} className='button-alert-con'>Logout</button> */}
    </>
  )
}
