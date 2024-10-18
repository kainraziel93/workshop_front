import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  const [btnColor,setBtnColor] = useState('')
  const [btnValue,setBtnValue] = useState('')
  const handleLoginLogoutChange = ()=>{
   if(localStorage.getItem('jwtToken') ===null || localStorage.getItem('jwtToken') === undefined)
   return ( <h6 className='btn btn-primary' style={{cursor:"pointer"}} onClick={()=>navigate('/login')}> Login </h6>)
  else return  ( <h6 className='btn btn-danger' style={{cursor:"pointer"}} onClick={()=>{
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('user_role')
      localStorage.removeItem('user_id')
      navigate('/login')
    }}> Logout </h6>)
  }
  return (
    <div>
      <div className='container  text-white'  >
        <div className='d-flex justify-content-between align-items-center py-2'>
          <div className='d-flex align-items-center gap-5'>
            <img src="/logo.svg" style={{maxHeight:"76px",width:"115px",borderRadius:"20px"}} alt="qs"  />
          <h4 style={{fontFamily:"cursive" ,cursor:"pointer"}} onClick={()=>{
              navigate("/")
            }} >Justice Connect </h4>
          </div>

            <div className='d-flex gap-5 align-items-center menu'>
              <h6 style={{fontFamily:"sans-serif",cursor:"pointer",fontSize:"large"} } onClick={()=>{
              navigate("/journal")
            }}>Journal d'Incident</h6>
              <h6 style={{fontFamily:"sans-serif",cursor:"pointer",fontSize:"large"} }  onClick={()=>{
              navigate("/contact")
            }}> Services </h6>
            </div>
            <div>
           
             <div>{handleLoginLogoutChange()}</div> 
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header