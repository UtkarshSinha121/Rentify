import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUserContext from './UserContext';

const UserAuth = ({children}) => {

  const {currentUser} = useUserContext();

  if(currentUser!==null){
    return children;
  }else{
   Swal.fire({
      icon : 'error',
      title : 'Oops...',
      text : 'You are not logged in'
    })
    return <Navigate to='/login'  />
  }

 
}

export default UserAuth