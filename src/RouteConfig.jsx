import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import Journal from './pages/Journal'
import JournalDetail from './pages/JournalDetail'
import LoginPage from './pages/LoginPage'
const RouteConfig = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/journal' element={<Journal />} />
                    <Route path='/journal/:id' element={<JournalDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default RouteConfig