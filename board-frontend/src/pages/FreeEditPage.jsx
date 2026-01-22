import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { getBoardFreeDetail, updateBoardFree } from '../api/FreeApi';
import FormCU from '../components/FormCU';

const FreeEditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoardFreeDetail(id);
        console.log("FreeEditPage data: ", data);
        setPost(data);
      } catch (error) {
        console.error("FreeEditPage 에러: ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    await updateBoardFree(id, data); // title, content, files, filesToDelete 포함
    // 수정 후 상세 페이지로 이동
    navigate(`/frees/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container className='mt-4'>
      <FormCU mode="edit" 
        initialData={post} 
        onSubmit={handleUpdate} 
      />
    </Container>
  );
};

export default FreeEditPage;