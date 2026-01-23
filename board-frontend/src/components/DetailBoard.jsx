import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { deleteBoardFree, downloadFile } from '../api/FreeApi';
import { deleteBoardThja } from '../api/ThjaApi';

const DetailBoard = ({ redirectPath, post, showFile = true }) => {
  const navigate = useNavigate();
  const deleteApiMap = {
    "/frees": deleteBoardFree,
    "/thjas": deleteBoardThja,
  };

  const handleDownload = async (filePath, fileName) => {
    try {
      const blob = await downloadFile(filePath);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([blob]));
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const deleteFn = deleteApiMap[redirectPath];
        if (deleteFn) {
          await deleteFn(post.id);
        }
        navigate(redirectPath);
      } catch (error) {
        console.error(error);
      }      
    }
  };  

  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text 
          style={{
            height: "300px",
            overflowY: "auto",
            whiteSpace: "pre-line"
          }}
        >
          {post.content}
        </Card.Text>

        {showFile && (
          <ListGroup className='border rounded mb-3'>
          {post.attachments && post.attachments.length > 0 ? (
            post.attachments.map((file, idx) => (
              <ListGroup.Item key={idx} className='d-flex justify-content-between align-items-center'>
                <span>{file.fileName}</span>
                <Button variant='primary'
                  onClick={() => handleDownload(file.filePath, file.fileName)}
                >다운로드</Button>
              </ListGroup.Item>
            ))
          ) : (
              <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                <span>첨부 파일이 없습니다.</span>
              </ListGroup.Item>
          )}
          </ListGroup>
        )}

        <div className='d-flex'>
          <Button variant='warning' className='me-2'
            onClick={() => navigate(showFile ? `/frees/${post.id}/edit` : `/thjas/${post.id}/edit`)}>
            수정
          </Button>
          <Button variant='danger' onClick={handleDelete}>삭제</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DetailBoard;