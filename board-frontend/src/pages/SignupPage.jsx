import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { signup } from "../api/auth";

const SignupPage = () => {
  const navigate = useNavigate();  
  const [form, setForm] = useState({ 
    username: "", password: "", passwordConfirm: "", email: "" 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await signup(form);
      navigate('/login');
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <Container className='mt-4'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center mb-4'>회원가입</Card.Title>
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
                <Form.Group className='mb-3'>
                  <Form.Label>비밀번호 확인</Form.Label>
                  <Form.Control type='password' name='passwordConfirm'
                    placeholder='비밀번호 확인 입력'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>이메일</Form.Label>
                  <Form.Control type='email' name='email'
                    placeholder='이메일 입력'
                    onChange={handleChange}
                  />
                </Form.Group>                
                <Button variant='success' type='submit' className='w-100'>회원가입</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;