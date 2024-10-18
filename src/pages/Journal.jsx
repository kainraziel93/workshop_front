import React, { useEffect, useState } from 'react';
import IncidentsList from '../components/IncidentsList';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
    const [incidents, setIncidents] = useState([])
    const [screens,setScreens] = useState([])
    const [description,setDescription] = useState("")
    const [title,setTitle] = useState("")
    const [reseau,setReseau] = useState("")
    const [harceleur,setHarceleur] = useState("")
    const [error,setError] = useState('')
    const userId = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("user_role")
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileArray = Array.from(selectedFiles); 
        console.log("files////////////",fileArray)
        setScreens(fileArray.map((file=>{return file.name}))); 
      };
      const handleAjout =async ()=>{
        let journal = { 
             id: incidents.length+1,
             title: title, 
             status: "en-cours", 
             userUrl:harceleur,
             reseau:reseau,
             description:description,
             screenshots :screens   
             }
            await addIncident(journal)
            
        console.log(incidents)
        
      }

      const addIncident = async (journal) => {
        try {
            const authrization = 'Bearer '+localStorage.getItem("jwtToken")
            console.log(authrization)
          const response = await fetch('http://localhost:8080/journal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+localStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
              journal,
              userId:userId
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('response is ok', data);
            setIncidents([...incidents,journal])
            
            
          } else {
            setError('erreur lors de l ajout d une nouvelle demande de plainte');
          }
        } catch (error) {
          console.error('erreur lors de l ajout', error);
          setError('An error occurred. Please try again later.');
        }
      };

      const getJournals = async ()=>{
     
          const authrization = 'Bearer '+localStorage.getItem("jwtToken")
          console.log(authrization)
          const response = await fetch('http://localhost:8080/journal/user/'+userId, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+localStorage.getItem("jwtToken")
            },

      })
      const data = await   response.json()
      setIncidents(data)
    }

    
    const getAllUsersJournals = async ()=>{
     
        const authrization = 'Bearer '+localStorage.getItem("jwtToken")
        console.log(authrization)
        const response = await fetch('http://localhost:8080/journal', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem("jwtToken")
          },

    })
    const data = await   response.json()
    setIncidents(data)
  }

      const navigate = useNavigate()
      useEffect(()=>{
        if(localStorage.getItem('jwtToken') ===null ||localStorage.getItem('jwtToken') === undefined ) navigate("/login")
       })
    useEffect(() => {
        if(userRole ==='USER') getJournals();
        else getAllUsersJournals()
    }, []);


    return (
        <div className='mt-5 container'>
            <h2 className='d-flex align-items-center justify-content-center mb-5' style={{fontFamily:"cursive"}}>Journal d'incident</h2>
            <div>
                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <div className='journal-element'>
                            <IncidentsList
                            key={incident.id}
                            title={incident.title}
                            id={incident.id}
                            status={incident.status} 
                            reseau={incident.reseau}
                            // Correction de la faute de frappe
                        />
                        </div>

                    ))
                ) : (
                    <h2 className='text-danger'>Aucune plainte n'a été reportée par vous</h2>
                )}
            </div>
            <div className='mt-4 d-flex align-items-center justify-content-end'>
                <div className='btn btn-success' style={{minWidth:"200px"}} data-bs-toggle="modal" data-bs-target="#exampleModal"> Declarer un harcelement</div>
            </div>
            {//declarer un harcelement modal
            }

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nouvelle declaration</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className='modal-body'>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Titre</label>
                        <input type="text"  onChange={(e)=>{
                            setTitle(e.target.value)
                        }}  class="form-control"  placeholder="titre" />
                    </div>
                    <select class="form-select" onChange={(e)=>{
                        setReseau(e.target.value)
                    }} aria-label="Default select example">
                    <option value="" disabled></option>
                    <option value="FACEBOOK">FACEBOOK</option>
                    <option value="INSTAGRAM">INSTAGRAM</option>
                    <option value="SNAPSHOT">SNAPSHOT</option>
                    <option value="TWITTER">TWITTER</option>
                    </select>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">url harceleur</label>
                        <input type="email" class="form-control"   onChange={(e)=>{
                            setHarceleur(e.target.value)
                        }}   placeholder="url harceleur" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Description</label>
                        <textarea rows={4} class="form-control"  onChange={(e)=>{
                            setDescription(e.target.value)
                        }} placeholder="Description" />
                    </div>
                    <div class="mb-3">
                    <label  class="form-label" >Screenshots</label>
                    <input class="form-control" onChange={handleFileChange}  type="file"  multiple />
                    </div>
                    
                </div>
                <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-primary" onClick={handleAjout}>Ajout</button>
                </div>
                
                </div>
            </div>
            </div>
        </div>
    );
}

export default Journal;
