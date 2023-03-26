import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Verifytoken = () => {
    const Navigate = useNavigate()
    const {resetToken}=useParams()
    console.log("res"+resetToken);
    
useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/verify-token/${resetToken}`)
      .then(res => {
        console.log(res);
        if (res.ok) {
         Navigate(`/reset-password/${resetToken}`)
        } else {
          console.error('Error verifying token:', res);
        }
      })
      .catch(error => console.error(error))
  }, [])
 
};

export default Verifytoken;