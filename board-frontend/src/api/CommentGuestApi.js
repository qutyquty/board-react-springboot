import axios from "./AxiosCommon";

// 댓글 등록
export const addCommentGuest = async (postId, newContent) => {
  try {
    const response = await axios.post(`/posts/${postId}/commentGuests`, newContent);
    return response.data;
  } catch (error) {
    console.error("addCommentGuest 에러: ", error);
    throw error;
  }
};

// 댓글 조회
export const getCommentGuests = async (postId) => {
  try {
    const response = await axios.get(`/posts/${postId}/commentGuests`);
    return response.data;
  } catch (error) {
    console.error("getCommentGuests 에러: ", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteCommentGuest = async (postId, commentId, password) => {
  try {
    const response = await axios.delete(`/posts/${postId}/commentGuests/${commentId}`, {
      data: { password }
    });
    return response.data;
  } catch (error) {
    console.error("deleteCommentGuest 에러: ", error);
    throw error;
  }
};