import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import DetailBoard from '../components/DetailBoard';
import { getBoardFreeDetail } from '../api/FreeApi';

const FreeDetailPage = () => {
  const { id } = useParams();
  const [thja, setThja] = useState(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const data = await getBoardFreeDetail(id);
      setThja(data);
    } catch (error) {
      console.error("FreeDetailPage 에러: ", error);
    }
  };

  if (!thja) return <p>Loading ...</p>;

  return (
    <Container className='mt-4'>
      <DetailBoard post={thja} />
    </Container>
  );
};

export default FreeDetailPage;