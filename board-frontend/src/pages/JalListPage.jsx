import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getAllBoardJals } from '../api/JalApi';
import CardStyleJal from '../components/CardStyleJal';

const JalListPage = () => {
  const [boardJals, setBoardJals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBoardJals();
        console.log("JalListPage: ", data);
        setBoardJals(data);
      } catch (error) {
        console.error("JalListPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>짤 리스트</h2>
      <CardStyleJal boardJals={boardJals} />
    </Container>
  );
};

export default JalListPage;