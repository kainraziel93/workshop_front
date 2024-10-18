import React from 'react'
import { useNavigate } from 'react-router-dom';

const IncidentsList = (props) => {
    const navigate = useNavigate()
    const getColorByStatus = () => {
        if (props.status === 'en-cours') {
            return '#0c00ff';
        } else if (props.status === 'refusé') {
            return 'red';
        } else if (props.status === 'accepté') {
            return 'green';
        }
        return 'black';
    }
    const getSocialColor = ()=>{
        if (props.reseau === "FACEBOOK") {
            return 'blue';
        } else if (props.reseau === 'INSTAGRAM') {
            return 'purple';
        } else if (props.reseau === 'SNAPSHOT') {
            return '#dede0b';
        }
        return 'black';
    }
  return (
    <div className='mt-2 py-2 px-2 bg-white '  onClick={()=>navigate("/journal/"+props.id,{state:{journalId:props.id}})} style={{border:"1px solid gray",borderRadius:"12px",cursor:""}}>
       <div className='row'>
                <h6 className='col-2' style={{color:"blue"}} > id : {props.id}</h6> 
                <h6 className='col-6'> titre : {props.title}</h6>     
            <h6 className='btn btn-warning  col-2' style={{width:"150px"}} > status : <span style={{color:getColorByStatus(),fontSize:"16px",fontWeight:"700"}}> {props.status}</span>  </h6>
            <div className='d-flex justify-content-center align-items-center col-2' style={{color:"blue"}}>
            <p style={{color:getSocialColor(),fontWeight:"700",fontFamily:"auto"}}>{props.reseau}</p>
       </div>
       </div>

    </div>
  )
}

export default IncidentsList