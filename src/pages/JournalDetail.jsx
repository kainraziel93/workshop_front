import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const JournalDetail = () => {
   const location = useLocation()
   const journalId = location.state.journalId
   const [information,setInformation]  = useState({})
  const userRole = localStorage.getItem('user_role')
  const [screens, setScreens] = useState([]); 
  const [screenDetail,setScreenDetail] = useState()
  const navigate = useNavigate()
   const getColorByStatus = (status) => {
    if (status === 'en-cours') {
        return '#0c00ff';
    } else if (status === 'refusé') {
        return 'red';
    } else if (status === 'accepté') {
        return 'green';
    }
    return 'black';
}

   const getJournal= async()=>{
    const response = await fetch("http://localhost:8080/journal/"+journalId,{
      headers:{
        'Authorization':"Bearer "+localStorage.getItem("jwtToken")
      }
    })
    const data = await response.json()
    setInformation(data);
    setScreens(data.screenshots || []); 
    console.log(information)
    
    console.log("data  =>",data)
   }

   const changeStatus = async (updatedStatus)=>{
  
      const response = await fetch('http://localhost:8080/journal/status/'+journalId+"?status="+updatedStatus,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+localStorage.getItem("jwtToken")
        }
        },);
      if(response.ok){
        const data = await response.json()
        console.log(data)
        await getJournal()
      }
   }
   
   useEffect(()=>{
    getJournal()
    console.log(screens)
   },[])


  useEffect(()=>{
    if(localStorage.getItem('jwtToken') ===null ||localStorage.getItem('jwtToken') === undefined ) navigate("/login")
   })
  return (
    <div className='container '>
      <div className='mt-5'>
          <h2 style={{fontFamily:"cursive"}}> detaille de la plainte N¤ {information.id}</h2>
      </div>
      <div className='mt-4'>
        <div className="row">
          <div className="col-7 p-0 " style={{border:"1px solid gray" ,boxShadow:"9px 1px transparent"}}>
            <h5 className='bg-info'>information sur la plainte deposer</h5>
            <div className='row mt-4'> <div className='col-2  detail-description'>status</div><div className='col' style={{color:getColorByStatus(information.status)}}>{information.status}</div></div>
            <div className='row mt-4'> <div className='col-2 detail-description'>reseau</div><div className='col'>{information.reseau}</div></div>
           <div className='row mt-4'> <div className='col-2 detail-description'>title</div><div className='col'>{information.title}</div></div>
           <div className='row mt-4'> <div className='col-2 detail-description'>url Harceleur</div><div className='col'><a href='https://google.com' target="_blank">{information.userUrl}</a></div></div>

          </div>
          <div className="col ms-2 p-0" style={{border:"1px solid gray"}}>
            <h5 className='bg-danger'>information sur l utilisateur</h5>
           <div className='row mt-2'> <div className='col-2 detail-description'>nom</div><div className='col'>{information.user?.nom}</div></div>
           <div className='row mt-2'> <div className='col-2 detail-description'>prenom</div><div className='col'>{information.user?.prenom}</div></div>
           <div className='row mt-2'> <div className='col-2 detail-description'>adress</div><div className='col'>{information.user?.adress}</div></div>
           <div className='row mt-2'> <div className='col-2 detail-d escription'>C.postal</div><div className='col'>{information.user?.codePostal}</div></div>
           <div className='row mt-2'> <div className='col-2 detail-description'>commune</div><div className='col'>{information.user?.commune}</div></div>
           <div className='row mt-2 mb-2'> <div className='col-2 detail-description'>email</div><div className='col'>{information.user?.email}</div></div>
          </div>
          <div className='col-12 mt-2 p-0 ' style={{border:"1px solid gray"}}>
            <h5 className='bg-success'>Description de la plainte</h5>
            <div className=''> {information.description}</div>
          </div>
          <div className='col mt-4'> 
            <h5 className='text-center mb-4'> Preuves</h5>
              <div className="row gx-4 gy-4 pb-4 px-3" style={{border:"1px solid gray",borderRadius:"15px"}}>
                {screens?.map((x,index)=>{
                  return (<div className="col-2"><img  
                    key={index}
                    className="img-fluid preuve-img rounded w-100"
                     style={{borderRadius:"20px",maxHeight:"150px",minHeight:"150px",cursor:"pointer"}}
                      src={"/screens/"+x} 
                      alt="qzd"  
                      data-bs-toggle="modal"
                       data-bs-target="#exampleModal"
                        onClick={()=>{
                        setScreenDetail(index)
                      }}/> 
                      </div>)
                })}
            </div>
            
          </div>
          
          { userRole==="ADMIN" && information.status ==='en-cours' ?
                   ( <div className="col-12 mt-2">
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        <div className='btn btn-success' onClick={()=>changeStatus("accepté")}>Accepté</div>
                        <div className="btn btn-danger" onClick={()=>changeStatus('refusé')}> Refusé</div>
                      </div>
                    </div>) :
                    (
                      <div className='mt-3'>
                        <h2 className='text-danger'> {information.status==="en-cours"? ("cette demande est "+information.status+" de traitement"):("cette demande a été "+information.status)}</h2>
                      </div>
                    )
          }

        </div>
        
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog " style={{maxWidth:"900px"}}>
        <div class="modal-content">
          <div class="modal-body">
            <img
            className='img-fluid'

            src={"/screens/"+screens[screenDetail]} 
            alt="" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default JournalDetail