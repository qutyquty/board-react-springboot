import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const { saveToken } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      saveToken(res.data.token); // res.data 전체가 아니라 res.data.token 저장
      navigate('/');
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <Container className='mt-4'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center mb-4'>로그인</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label>아이디</Form.Label>
                  <Form.Control type='text' name='username'
                    placeholder='아이디 입력'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control type='password' name='password'
                    placeholder='비밀번호 입력'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='w-100'>로그인</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;