import React from 'react';
import dayjs from 'dayjs';

const CommentList = ({ comments, onDelete }) => {
  const handleDelete = async (id) => {
    // 1. 비밀번호 입력
    const password = prompt("댓글 작성 시 입력한 비밀번호를 입력하세요: ");
    if (!password) return;

    // 2. 비밀번호 검증
    const isValid = await onDelete(id, password);
    if (!isValid) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3. 최종 삭제 여부 확인
    const confirmed = window.confirm("정말 이 댓글을 삭제하시겠습니까?");
    if (confirmed) {
      onDelete(id, password, true); // 최종 삭제
    }
  };

  return (
    <div className='mt-3'>
      {comments.map((c, idx) => (
        <div key={idx} className='border-bottom py-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <strong>{c.writerName}</strong>
            <div className='d-flex align-items-center'>
              <small className='text-muted me-2'>{dayjs(c.createdAt).format("YYYY-MM-DD HH:mm:ss")}</small>
              {/** 삭제 버튼 */}
              <button className='btn btn-sm btn-outline-danger'
                onClick={() => handleDelete(c.id)}>x
              </button>
            </div>
          </div>
          <p className='mb-1'
            style={{ whiteSpace: "pre-line", overflowY: "auto" }}>{c.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;