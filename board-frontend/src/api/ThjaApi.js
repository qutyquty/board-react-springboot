import axios from "axios";

// Axios 기본 인스턴스 생성
const ThjaApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 게시글 등록
export const createThja = async (title, content) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  try {
    const response = await ThjaApi.post("/thjas", formData);
    return response.data;
  } catch (error) {
    console.error("createThja 에러: ", error);
    throw error;
  }
};

// 전체 게시글 조회
export const getAllBoardThjas = async () => {
  try {
    const response = await ThjaApi.get(`/thjas`);
    return response.data;
  } catch (error) {
    console.error("getAllBoardThjas 에러: ", error);
    throw error;
  }
};

// id로 게시글 상세 조회
export const getBoardThjaDetail = async (id) => {
  try {
    const response = await ThjaApi.get(`/thjas/${id}`);
    return response.data;
  } catch (error) {
    console.error("getBoardThjaDetail 에러: ", error);
    throw error;
  }
};

export const deleteBoardThja = async (id) => {
  try {
    const response = await ThjaApi.delete(`/thjas/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteBoardThja 에러: ", error);
    throw error;
  }
};

// 게시글 수정
export const updateBoardThja = async (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);

  try {
    const response = await ThjaApi.put(`/thjas/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("updateBoardThja 에러: ", error);
    throw error;
  }
};