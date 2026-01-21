import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { createThja } from '../api/ThjaApi';
import FormComponent from '../components/FormComponent';

const ThjaFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content }) => {
    try {
      const result = await createThja(title, content);
      navigate('/thjas');
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <Container className='mt-4'>
      <h2>200자 등록</h2>
      <FormComponent onSubmit={handleSubmit} showFile={false} />
    </Container>
  );
};

export default ThjaFormPage;