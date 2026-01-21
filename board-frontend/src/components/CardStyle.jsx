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
              <Card.Body>
                <Link to={`/thjas/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card.Text>{post.content}</Card.Text>                  
                </Link>
              </Card.Body>
              <Card.Footer>
                <Card.Title>{post.title}</Card.Title>
                <div className='d-flex justify-content-end'>
                  <Card.Text>릴레이 수: {post.commentCount}</Card.Text>
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