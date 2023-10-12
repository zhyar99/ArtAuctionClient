import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from 'primereact/button';
import { Routes, Route, Router } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import axios from 'axios';
import UserContextProvider from './UserContext';
import './App.css'
import RegisterPage from './pages/RegisterPage';
import ArtistRegisterPage from './pages/ArtistRegisterPage';
import AddAuction from './pages/AddAuction';
import ArtPage from './pages/ArtPage';
import ArtistPage from './pages/ArtistPage';
import MyAuction from './pages/MyAuction';

function App() {

  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes>
          <Route path='/' element={ <Layout /> } >
            <Route index element={ <IndexPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/artistregistration' element={ <ArtistRegisterPage /> } />
            <Route path='/addauction' element={ <AddAuction /> } />
            <Route path='/myauctions' element={ <MyAuction /> } />
            <Route path='/art/:artId' element={ <ArtPage /> } />
            <Route path='/artist/:artistId' element={ <ArtistPage /> } />
          </Route>
        </Routes>
      </UserContextProvider>
  )
}

export default App
