import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardStyle = ({ posts }) => {
  return (
    <>
      <Row>
        {posts?.map((post) => (
          <Col md={3} key={post.id} className='mb-3'>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">{post.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Link to={`/thjas/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card.Text style={{
                    overflowY: "auto",
                    whiteSpace: "pre-line"
                  }}>{post.content}</Card.Text>                  
                </Link>
              </Card.Body>
              <Card.Footer>                
                <div className='d-flex justify-content-between'>
                  <p className="mb-0">{post.writerName}</p>
                  <p className="mb-0">릴레이 수: {post.commentCount}</p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/thjas/new">
        <Button variant='success' className='mt-3'>등록하기</Button>
      </Link>
    </>
  );
};

export default CardStyle;