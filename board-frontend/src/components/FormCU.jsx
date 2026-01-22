import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const FormCU = ({ mode = "create", initialData = {}, onSubmit, showFile = true }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [files, setFiles] = useState(
    initialData.attachments 
      ? [
          ...initialData.attachments,
          ...Array(4 - initialData.attachments.length).fill(null),
        ]
      : [null, null, null, null]
  );  
  const [filesToDelete, setFilesToDelete] = useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    if (!showFile && value.length > 200) {
      alert("200자를 초과했습니다.");
      return;
    }
    setContent(value);
  };

  // 파일 업로드 처리
  const handleFileChange = (index, e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0] || null; // 새 파일 객제 저장
    setFiles(newFiles);
  };

  // 파일 삭제 처리
  const handleDeleteFile = (index, fileId) => {
    const newFiles = [...files];
    newFiles[index] = null; // 해당 슬롯을 비움
    setFiles(newFiles);

    // 수정 모드일 때만 삭제할 파일 ID 기록
    if (mode === "edit" && fileId) {
      setFilesToDelete((prev) => [...prev, fileId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, files, filesToDelete });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* 제목 */}      
      <Form.Group className='mb-3'>
        <Form.Label>제목</Form.Label>
        <Form.Control type='text' value={title} placeholder='제목 입력'
          onChange={(e) => setTitle(e.target.value)} 
        />          
      </Form.Group>

      {/* 내용 */}
      <Form.Group className='mb-3'>
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={10} value={content} placeholder='내용 입력'
          onChange={handleChange} 
        />
        {!showFile && 
        <div style={{ textAlign: "right", marginTop: "5px" }}>
          {content.length} / 200
        </div>
        }
      </Form.Group>

      {showFile && (
        <>
          <Form.Group className='mb-3'>
            <Form.Label>첨부파일 (최대 4개)</Form.Label>

            <ListGroup className='border rounded mb-3'>
              {Array.from({ length: 4 }).map((_, index) => {
                const file = files[index]; // files 배열을 길이 4로 관리한다고 가정

                return (
                  <ListGroup.Item
                    key={index}
                    className='d-flex justify-content-between align-items-center'
                  >
                    {file ? (
                      <>
                        <span>{file.fileName || file.name}</span>
                        <Button
                          variant='danger'
                          size='sm'
                          className='ms-2'
                          onClick={() => handleDeleteFile(index, file.id)}
                        >
                          삭제
                        </Button>
                      </>
                    ) : (
                      <Form.Control
                        type='file'
                        onChange={(e) => handleFileChange(index, e)}
                      />
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            
            {/* 기존 첨부파일 목록 */}
            {/* <ListGroup className='border rounded mb-3'>
            {files && files.map((file, index) => (
              <ListGroup.Item key={file?.id} className='d-flex justify-content-between align-items-center'>
                <span>{file?.fileName}</span>
                <Button variant='danger' size="sm" className='ms-2'
                  onClick={() => handleDeleteFile(index, file?.id)}
                >
                  삭제
                </Button>
              </ListGroup.Item>
            ))}
            </ListGroup> */}

            {/* 남은 업로드 슬롯 */}
            {/* {Array.from({ length: 4 - (files?.length || 0) }).map((_, idx) => (
              <div key={idx} className='d-flex align-items-center mb-2'>
                <Form.Control type='file' onChange={(e) => handleChange(idx, e)} />
              </div>
            ))} */}

            {/* {files.map((file, index) => (
              <div key={index} className='d-flex align-items-center mb-2'>
                <Form.Control type="file" onChange={(e) => handleFileChange(index, e)} />
                {file && (
                  <>
                    <span className='ms-2'>{file.fileName || file.originalName}</span>
                    <Button variant='danger' size='sm' className='ms-2'
                      onClick={() => handleDeleteFile(index, file.id)} 
                    />
                  </>
                )}
              </div>
            ))} */}
          </Form.Group>
        </>
      )}
      <Button variant='primary' type='submit'>
        {mode === "create" ? "등록" : "수정"}
      </Button>
    </Form>
  );
};

export default FormCU;