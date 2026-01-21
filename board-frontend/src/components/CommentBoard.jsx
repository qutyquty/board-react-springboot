import { useEffect, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

import { addComment, getComments, updateComment, deleteComment } from '../api/CommentApi';

const CommentBoard = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleChange = (e, setter) => {
    const value = e.target.value;
    if (value.length > 200) {
      alert("200자를 초과했습니다.");
      return;
    }
    setter(value);
  };

  // 댓글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await getComments(postId);
      setComments(data);
    };
    fetchData();
  }, [postId]);

  // 댓글 작성
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const saved = await addComment(postId, newComment);
    setComments([...comments, saved]);
    setNewComment("");
  };

  // 댓글 삭제
  const handleDeleteComment = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteComment(postId, id);
      setComments(comments.filter((c) => c.id !== id));
    }
  };

  // 댓글 수정
  const handleSaveEdit = async (id) => {
    const updated = await updateComment(postId, id, editingText);
    setComments(comments.map((c) => (c.id === id ? updated : c)));
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div>
      <h5>릴레이</h5>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={comment.id}>
            {editingIndex === index ? (
              <>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editingText}
                  onChange={(e) => handleChange(e, setEditingText)}
                />
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <div>
                    <Button
                      variant="success"
                      size="sm"
                      className="mt-2 me-2"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                      onClick={() => setEditingIndex(null)}
                    >
                      취소
                    </Button>
                  </div>
                  <div>{editingText.length} / 200</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ 
                  whiteSpace: "pre-line",
                  height: "100px",
                  overflowY: "auto",
                  boarder: "1px solid #ddd",
                  padding: "5px" 
                }}>
                  {comment.content}
                </div>
                <div className="mt-2">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingText(comment.content);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      
      <Form className="mt-3">
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="댓글 입력"
          value={newComment}
          onChange={(e) => handleChange(e, setNewComment)} 
        />
        <div className='d-flex justify-content-between align-items-center mt-2'>
          <Button onClick={handleAddComment}>작성</Button>
          <div>{newComment.length} / 200</div>
        </div>
      </Form>
    </div>
  );
};

export default CommentBoard;