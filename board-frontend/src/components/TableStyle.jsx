import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs';

const TableStyle = ({ posts }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <div className='row mb-3'>
          <div className='col-md-3'></div>
          <div className='col-md-2'></div>
          <div className='col-md-3'>
              <input type='text' className='form-control'
                  placeholder='검색어 입력' value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
              />
          </div>
          <div className='col-md-2'>
              <button className='btn btn-primary w-100'>검색</button>
          </div>
          <div className='col-md-2'>
              <Link to={`/thjas/new`} className='btn btn-primary w-100'>작성하기</Link>
          </div>
      </div>
      <Table striped bordered hover className='text-center align-middle'>
        <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "60%" }} />
            <col style={{ width: "20%" }} />
        </colgroup>        
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td className='text-start'>
                  <Link to={`/thjas/${post.id}`}>{post.title}</Link>
                </td>
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