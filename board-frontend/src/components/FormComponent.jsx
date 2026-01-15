import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormComponent = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState({
    file1: null,
    file2: null,
    file3: null, 
    file4: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, files });
  };

  const handleFileChange = (key, e) => {
    setFiles((prev) => ({ ...prev, [key]: e.target.files[0] }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>제목</Form.Label>
        <Form.Control type='text' value={title} placeholder='제목 입력'
          onChange={(e) => setTitle(e.target.value)} 
        />          
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={10} value={content} placeholder='내용 입력'
          onChange={(e) => setContent(e.target.value)} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>첨부파일1</Form.Label>
        <Form.Control type='file' onChange={(e) => handleFileChange("file1", e)} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>첨부파일2</Form.Label>
        <Form.Control type='file' onChange={(e) => handleFileChange("file2", e)} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>첨부파일3</Form.Label>
        <Form.Control type='file' onChange={(e) => handleFileChange("file3", e)} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>첨부파일4</Form.Label>
        <Form.Control type='file' onChange={(e) => handleFileChange("file4", e)} />
      </Form.Group>
      <Button type='submit' variant='success'>등록</Button>
    </Form>
  );
};

export default FormComponent;