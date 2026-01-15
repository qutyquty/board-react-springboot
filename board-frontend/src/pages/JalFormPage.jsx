import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { createJal } from '../api/JalApi';
import FormComponent from '../components/FormComponent';

const JalFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content, files }) => {
    try {
      const result = await createJal(title, content, files);
      navigate('/jals');
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <Container className='mt-4'>
      <h2>움짤 등록</h2>
      <FormComponent onSubmit={handleSubmit} />
    </Container>
  );
};

export default JalFormPage;