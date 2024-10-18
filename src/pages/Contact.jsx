import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('jwtToken') ===null ||localStorage.getItem('jwtToken') === undefined ) navigate("/login")
   })
  return (
    <div className='container'>
      <h2>Page Services</h2>
      <select class="form-select mt-4"  aria-label="Default select example">
                    <option value="" disabled></option>
                    <option value="Juridique">Juridique</option>
                    <option value="Police">Police</option>
                    <option value="Thérapie">Thérapie</option>
                    </select>
    </div>
  )
}

export default Contact