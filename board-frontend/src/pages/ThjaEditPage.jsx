import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { getBoardThjaDetail, updateBoardThja } from '../api/ThjaApi';
import FormCU from '../components/FormCU';

const ThjaEditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoardThjaDetail(id);
        console.log("ThjaEditPage data: ", data);
        setPost(data);
      } catch (error) {
        console.error("ThjaEditPage 에러: ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    await updateBoardThja(id, data); // title, content 포함
    // 수정 후 상세 페이지로 이동
    navigate(`/thjas/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container className='mt-4'>
      <FormCU mode="edit" 
        initialData={post} 
        onSubmit={handleUpdate} 
        showFile={false}
      />
    </Container>
  );
};

export default ThjaEditPage;