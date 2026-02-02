import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentInput = ({ onSubmit }) => {
  const [writerName, setWriterName] = useState("");
  const [password, setPassword] = useState("")
  const [content, setContent] = useState("");

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
          <Form.Group>
            <Form.Control as="textarea" rows={5}
              placeholder='댓글 입력' value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default CommentInput;