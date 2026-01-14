import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 fixed-bottom">
      <Container>
        <small>© {new Date().getFullYear()} MyApp. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer