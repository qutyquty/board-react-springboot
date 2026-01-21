import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getAllBoardThjas } from '../api/ThjaApi';
import CardStyle from '../components/CardStyle';

const ThjaListPage = () => {
  const [boardThjas, setBoardThjas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBoardThjas();
        console.log("ThjaListPage: ", data);
        setBoardThjas(data);
      } catch (error) {
        console.error("ThjaListPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>200자 리스트</h2>
      <CardStyle posts={boardThjas} />
    </Container>    
  );
};

export default ThjaListPage;