import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const items = [];

  // 현재 페이지가 속한 블록 계산 (10개씩)
  const blockSize = 10;
  const currentBlock = Math.floor(currentPage / blockSize);
  const start = currentBlock * blockSize;
  const end = Math.min(start + blockSize, totalPages);

  for (let number = start; number < end; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number + 1} {/* 1부터 표시 */}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First 
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      />
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
      />
      {items}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      />
    </Pagination>
  );
};

export default PaginationComponent;