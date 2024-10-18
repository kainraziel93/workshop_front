import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
 useEffect(()=>{
  if(localStorage.getItem('jwtToken') ===null ||localStorage.getItem('jwtToken') === undefined ) navigate("/login")
 })
   return (
    <div className='container'>
        <div className='d-flex align-items-center justify-content-center mt-5'>
            <h2 style={{fontFamily:"sans-serif",color:"0000dd",fontFamily:"auto"}}> A propos </h2>
        </div>
        <div className='mt-4 p-3 '  style={{border:"1px solid gray",color:"#4d4a77",boxShadow:"2px 2px 2px 2px",fontWeight:"500"}}>
            <h6   style={{fontSize:"18px"}}>
            Justice Connect: Reprenez le Contrôle de Votre Sécurité en Ligne.<br/>Justice Connect est une application dédiée aux victimes de cyberharcèlement, conçue pour simplifier et sécuriser le processus de dépôt de plaintes en ligne.<br/> Grâce à notre plateforme, vous pouvez facilement documenter vos expériences, collecter des preuves, et préparer des dossiers légaux conformes pour une soumission directe aux autorités compétentes. En plus de fournir un soutien juridique, Justice Connect vous offre des ressources éducatives, un réseau de soutien communautaire, et un accès à des services de thérapie. Avec Justice Connect, vous n'êtes jamais seul face au cyberharcèlement. Rejoignez notre communauté et prenez les mesures nécessaires pour faire entendre votre voix et protéger vos droits.
            </h6>
        </div>
    </div>
  )
}

export default HomePage