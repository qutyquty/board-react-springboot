import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import DetailJal from '../components/DetailJal';
import { getBoardJalDetail } from '../api/JalApi';

const JalDetailPage = () => {
  const { id } = useParams();
  const [jal, setJal] = useState(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const data = await getBoardJalDetail(id);
      setJal(data);
    } catch (error) {
      console.error("JalDetailPage 에러: ", error);
    }
  };

  if (!jal) return <p>Loading ...</p>;

  return (
    <Container className='mt-4'>
      <DetailJal jal={jal} />
    </Container>
  );
};

export default JalDetailPage;