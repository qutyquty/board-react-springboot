import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from "../context/AuthContext";
import DetailBoard from '../components/DetailBoard';
import { getBoardThjaDetail } from '../api/ThjaApi';
import { addCommentGuest, getCommentGuests, deleteCommentGuest } from '../api/CommentGuestApi';
import CommentBoard from '../components/CommentBoard';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

const ThjaDetailUpPage = () => {
  const { id } = useParams();
  const [thja, setThja] = useState(null);
  const { token } = useAuth();
  const [comments, setComments] = useState([]);

  const handleAddComment = async (newComment) => {
    const saved = await addCommentGuest(id, newComment);
    setComments([...comments, saved]);
  };

  const handleDeleteComment = async (commentId, password, confirmed = false) => {
    if (!confirmed) {
      // 비밀번호 검증 API 호출
      const valid = await checkCommentPassword(id, password);
      return valid;
    } else {
      // 최종 삭제 API 호출
      await deleteCommentGuest(id, commentId, password);
      setComments(comments.filter((c) => c.id !== commentId));    
      return true;
    }
  };

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
      const dataComments = await getCommentGuests(id);
      setThja(data);
      setComments(dataComments);
    } catch (error) {
      console.error("ThjaDetailUpPage 에러: ", error);
    }
  };

  if (!thja) return <p>Loading ...</p>;

  return (
    <Container className='mt-4'>
      <DetailBoard redirectPath={'/thjas'} post={thja} showFile={false} authUsername={username} />

      {/** 댓글 리스트 */}
      <CommentList comments={comments} onDelete={handleDeleteComment} />

      {/** 댓글 입력창 */}
      <CommentInput onSubmit={handleAddComment} />
    </Container>
  );
};

export default ThjaDetailUpPage;