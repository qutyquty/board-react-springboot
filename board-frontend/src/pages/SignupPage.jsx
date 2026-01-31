import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { signup } from "../api/auth";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("회원가입 성공!");
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