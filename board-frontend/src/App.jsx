import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import JalListPage from './pages/JalListPage';
import JalFormPage from './pages/JalFormPage';
import JalDetailPage from './pages/JalDetailPage';
import ThjaListPage from './pages/ThjaListPage';
import ThjaFormPage from './pages/ThjaFormPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='main-content'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<JalListPage />} />
            <Route path='/jal' element={<JalListPage />} />
            <Route path='/jal/new' element={<JalFormPage />} />
            <Route path='/jal/:id' element={<JalDetailPage />} />
            <Route path='/thja' element={<ThjaListPage />} />
            <Route path='/thja/new' element={<ThjaFormPage />} />
          </Routes>
        </main>
        <Footer />
      </div>      
    </BrowserRouter>
  );
};

export default App;
