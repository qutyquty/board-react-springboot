import React from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { deleteBoardJal } from '../api/JalApi';

const DetailJal = ({ jal }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteBoardJal(jal.id);
        navigate("/jals");
      } catch (error) {
        console.error(error);
      }      
    }
  };

  return (
    <Card>
      <Card.Header>{jal.title}</Card.Header>
      <Card.Body>        
        {jal.attachments && jal.attachments.length > 0 && (
          <Row>
            {jal.attachments.map((file, index) => (
              <Col md={3} key={index} style={{ marginBottom: "1rem "}}>
                {file.fileName.endsWith(".mp4") ? (
                  <video width="100%" controls autoPlay muted loop
                    src={`http://localhost:8080/files/${file.savedFileName}`} 
                  />
                ) : (
                  <Card.Img variant='top'
                    src={`http://localhost:8080/files/${file.savedFileName}`} 
                    alt={file.fileName}
                  />
                )}
              </Col>
            ))}
          </Row>
        )}
        <hr />
        <Card.Text>{jal.content}</Card.Text>
        <Button variant='danger' onClick={handleDelete}>삭제</Button>
      </Card.Body>        
    </Card>
  );
};

export default DetailJal;