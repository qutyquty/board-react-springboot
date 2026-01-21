import axios from "./AxiosCommon";

// 댓글 등록
export const addComment = async (postId, content) => {
  try {
    const response = await axios.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error("addComment 에러: ", error);
    throw error;
  }
};

// 댓글 조회
export const getComments = async (postId) => {
  try {
    const response = await axios.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("getComments 에러: ", error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (postId, commentId, content) => {
  try {
    const response =  await axios.put(`/posts/${postId}/comments/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error("updatecomment 에러", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("deleteComment 에러: ", error);
    throw error;
  }
};