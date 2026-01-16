import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getAllBoardFrees } from '../api/FreeApi';
import TableStyle from '../components/TableStyle';

const FreeListPage = () => {
  const [boardFrees, setBoardFrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBoardFrees();
        console.log("FreeListPage: ", data);
        setBoardFrees(data);
      } catch (error) {
        console.error("FreeListPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>자유게시판 리스트</h2>
      <TableStyle posts={boardFrees} />
    </Container>    
  );
};

export default FreeListPage;