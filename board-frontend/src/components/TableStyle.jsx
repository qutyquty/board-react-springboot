import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Table } from 'react-bootstrap';
import dayjs from 'dayjs';

const TableStyle = ({ posts, pageInfo, onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  }

  return (
    <div>
      <div className='row mb-3'>
          <div className='col-md-3'></div>
          <div className='col-md-2'></div>
          <div className='col-md-3'>
              <input type='text' className='form-control'
                  placeholder='검색어 입력' value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown} // 엔터 감지
              />
          </div>
          <div className='col-md-2'>
              <button className='btn btn-primary w-100' onClick={() => onSearch(keyword)}>
                검색
              </button>
          </div>
          <div className='col-md-2'>
              <Link to={`/frees/new`} className='btn btn-primary w-100'>작성하기</Link>
          </div>
      </div>
      <Table striped bordered hover className='text-center align-middle'>
        <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
        </colgroup>        
        <thead className='table-dark'>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.id}>
                <td>
                  {pageInfo.totalElements - (pageInfo.number * pageInfo.size + index)}
                </td>
                <td className='text-start'>
                  <Link to={`/frees/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {post.title} {post.attachments && post.attachments.length > 0 ? <span>📂</span> : ""}
                  </Link>
                </td>
                <td>{post.writerName}</td>
                <td>{dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className='text-center'>
                게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableStyle;