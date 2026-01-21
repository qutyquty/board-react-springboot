import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { createFree } from '../api/FreeApi';
import FormComponent from '../components/FormComponent';

const FreeFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content, files }) => {
    try {
      const result = await createFree(title, content, files);
      navigate('/frees');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className='mt-4'>
      <h2>자유게시판</h2>
      <FormComponent onSubmit={handleSubmit} showFile={true} />
    </Container>
  );
};

export default FreeFormPage;