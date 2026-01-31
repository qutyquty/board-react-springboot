import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from "./context/AuthContext";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ThjaListPage from './pages/ThjaListPage';
import ThjaFormPage from './pages/ThjaFormPage';
import ThjaDetailPage from './pages/ThjaDetailPage';
import ThjaEditPage from './pages/ThjaEditPage';
import FreeListPage from './pages/FreeListPage';
import FreeFormPage from './pages/FreeFormPage';
import FreeDetailPage from './pages/FreeDetailPage';
import FreeEditPage from './pages/FreeEditPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/SignupPage';

import './App.css';

function App() {
  return (    
    <BrowserRouter>
      <AuthProvider>
        <div className='main-content'>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/thjas' element={<ThjaListPage />} />
              <Route path='/thjas/new' element={<ThjaFormPage />} />
              <Route path='/thjas/:id' element={<ThjaDetailPage />} />
              <Route path='/thjas/:id/edit' element={<ThjaEditPage />} />
              <Route path='/frees' element={<FreeListPage />} />
              <Route path='/frees/new' element={<FreeFormPage />} />
              <Route path='/frees/:id' element={<FreeDetailPage />} />
              <Route path='/frees/:id/edit' element={<FreeEditPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </div>      
      </AuthProvider>
    </BrowserRouter>    
  );
};

export default App;
