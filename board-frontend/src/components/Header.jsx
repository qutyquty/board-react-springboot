import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { token, logout } = useAuth();

  // 토큰에서 username 추출
  let username = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub; // JwtUtil에서 setSubject(username) 했으므로 sub에 들어있음
    } catch (err) {
      console.error("토큰 디코딩 실패: ", err);
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          {/* 브랜드 로고 */}
          <Navbar.Brand href="/">Board App</Navbar.Brand>

          {/* 햄버거 버튼 */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* 메뉴 래핑 */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            {!token ? (
              <>
                <Nav>
                  <Nav.Link as={NavLink} to="/login">로그인</Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">회원가입</Nav.Link>
                </Nav>
              </>              
            ) : (
              <>
                <Nav>
                  <Nav.Link as={NavLink} to="/frees">자유게시판</Nav.Link>
                  <Nav.Link as={NavLink} to="/thjas">200자</Nav.Link>
                </Nav>
                <Nav className='ms-auto'>
                  <span className='me-3'>👤 {username} 님</span>
                  <Button variant='outline-danger' size='sm' onClick={logout}>
                    로그아웃
                  </Button>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;