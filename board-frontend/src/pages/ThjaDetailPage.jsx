import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import DetailBoard from '../components/DetailBoard';
import { getBoardThjaDetail } from '../api/ThjaApi';
import CommentBoard from '../components/CommentBoard';

const ThjaDetailPage = () => {
  const { id } = useParams();
  const [thja, setThja] = useState(null);

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
      <DetailBoard redirectPath={'/thjas'} post={thja} showFile={false} />
      <CommentBoard postId={thja.id} />
    </Container>
  );
};

export default ThjaDetailPage;