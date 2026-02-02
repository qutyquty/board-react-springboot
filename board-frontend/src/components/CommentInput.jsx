import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentInput = ({ onSubmit }) => {
  const [writerName, setWriterName] = useState("");
  const [password, setPassword] = useState("")
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 200) {
      alert("200자를 초과했습니다.");
      return;
    }
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!writerName || !password || !content) return;
    onSubmit({ writerName, password, content });
    setWriterName("");
    setPassword("");
    setContent("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <div className='d-flex'>
        {/** 왼쪽: 작성자+비밀번호+등록번튼 */}
        <div className='me-3' style={{ width: "200px"}}>
          <Form.Group className='mb-2'>
            <Form.Control type='text' placeholder='작성자'
              value={writerName} onChange={(e) => setWriterName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Control type='password' placeholder='비밀번호'
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className='w-100' type='submit' variant='primary'>등록</Button>
        </div>
        {/** 오른쪽: 댓글 입력창 */}
        <div className='flex-grow-1'>
          <Form.Group className='border p-2 rounded'>
            <Form.Control as="textarea" rows={4}
              placeholder='댓글 입력' value={content}
              onChange={handleChange} 
              style={{ border: "none", boxShadow: "none" }}
            />
            <div className="d-flex justify-content-end mt-1">
              <small className='text-muted'>{content.length} / 200</small>
            </div>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default CommentInput;