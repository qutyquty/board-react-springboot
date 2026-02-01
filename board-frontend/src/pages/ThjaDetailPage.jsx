import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from "../context/AuthContext";
import DetailBoard from '../components/DetailBoard';
import { getBoardThjaDetail } from '../api/ThjaApi';
import CommentBoard from '../components/CommentBoard';

const ThjaDetailPage = () => {
  const { id } = useParams();
  const [thja, setThja] = useState(null);
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
      const data = await getBoardThjaDetail(id);
      setThja(data);
    } catch (error) {
      console.error("ThjaDetailPage 에러: ", error);
    }
  };

  if (!thja) return <p>Loading ...</p>;

  return (
    <Container className='mt-4'>
      <DetailBoard redirectPath={'/thjas'} post={thja} showFile={false} authUsername={username} />
      <CommentBoard postId={thja.id} />
    </Container>
  );
};

export default ThjaDetailPage;