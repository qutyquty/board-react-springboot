import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getAllBoardFrees, getAllBoardFreesPagination } from '../api/FreeApi';
import TableStyle from '../components/TableStyle';
import PaginationComponent from '../components/PaginationComponent';

const FreeListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [boardFrees, setBoardFrees] = useState([]);
  const [pageInfo, setPageInfo] = useState({ 
    number: 0, totalPages: 0, size: 10, totalElements: 0 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 0, keyword = "") => {
    try {
      const data = await getAllBoardFreesPagination(page, 10, keyword);
      console.log("FreeListPage: ", data);
      setBoardFrees(data.content);
      setPageInfo({ 
        number: data.number, totalPages: data.totalPages,
        size: data.size, totalElements: data.totalElements 
      });
    } catch (error) {
      console.error("FreeListPage 에러: ", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>자유게시판 리스트</h2>
      <TableStyle 
        posts={boardFrees} 
        pageInfo={pageInfo}
        onSearch={(kw) => {
          setKeyword(kw);
          fetchData(0, kw);
        }}
      />
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <PaginationComponent
          currentPage={pageInfo.number}
          totalPages={pageInfo.totalPages}
          onPageChange={(page) => fetchData(page, keyword)}
        />
      </div>
    </Container>    
  );
};

export default FreeListPage;