import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import JalListPage from './pages/JalListPage';
import JalFormPage from './pages/JalFormPage';
import JalDetailPage from './pages/JalDetailPage';
import ThjaListPage from './pages/ThjaListPage';
import ThjaFormPage from './pages/ThjaFormPage';
import ThjaDetailPage from './pages/ThjaDetailPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='main-content'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<JalListPage />} />
            <Route path='/jals' element={<JalListPage />} />
            <Route path='/jals/new' element={<JalFormPage />} />
            <Route path='/jals/:id' element={<JalDetailPage />} />
            <Route path='/thjas' element={<ThjaListPage />} />
            <Route path='/thjas/new' element={<ThjaFormPage />} />
            <Route path='/thjas/:id' element={<ThjaDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>      
    </BrowserRouter>
  );
};

export default App;
