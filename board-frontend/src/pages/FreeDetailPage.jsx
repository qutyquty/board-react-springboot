import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from "../context/AuthContext";
import DetailBoard from '../components/DetailBoard';
import { getBoardFreeDetail } from '../api/FreeApi';

const FreeDetailPage = () => {
  const { id } = useParams();
  const [free, setFree] = useState(null);
  const { token } = useAuth();  

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

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const data = await getBoardFreeDetail(id);
      setFree(data);
    } catch (error) {
      console.error("FreeDetailPage 에러: ", error);
    }
  };

  if (!free) return <p>Loading ...</p>;

  return (
    <Container className='mt-4'>
      <DetailBoard redirectPath={'/frees'} post={free} authUsername={username} />
    </Container>
  );
};

export default FreeDetailPage;