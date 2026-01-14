import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardJalComponent = ({ boardJals }) => {
  const API_URL = "http://localhost:8080";

  return (
    <>
      <Row>
        {boardJals.map((jal) => (
          <Col md={2} key={jal.id} className='mb-3'>
            <Card>
              {/** 첨부파일이 있으면 랜덤 이미지로 표시 */}
              {jal.attachments && jal.attachments.length > 0 && (
                jal.randomAttachment.fileName.endsWith(".mp4") ? (
                  <video width="100%" controls 
                    autoPlay // 자동재생
                    muted // 자동재생을 위해 음소거 필요
                    loop // 무한 반복 재생
                    src={`${API_URL}/files/${jal.randomAttachment.savedFileName}`} />
                ) : (
                  <Card.Img variant='top'
                    src={`${API_URL}/files/${jal.randomAttachment.savedFileName}`}
                    alt={jal.randomAttachment.fileName} 
                  />
                )
              )}
              <Card.Body>
                <Link to={`/jal/${jal.id}`}>
                  <Card.Title>{jal.title}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/jal/new">
        <Button variant='success' className='mt-3'>등록하기</Button>
      </Link>
    </>
  );
};

export default CardJalComponent;