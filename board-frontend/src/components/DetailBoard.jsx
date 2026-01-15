import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { downloadFile } from '../api/ThjaApi';

const DetailBoard = ({ post }) => {
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

  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>

        {post.attachments && post.attachments.length > 0 ? (
          post.attachments.map((file, idx) => (
            <Button key={idx} variant='primary' className='m-1'
              onClick={() => handleDownload(file.filePath, file.fileName)}
            >
              {file.name} 다운로드
            </Button>
          ))
        ) : (
          <p>첨부파일 없음</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default DetailBoard;