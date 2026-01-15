import axios from "axios";

// Axios 기본 인스턴스 생성
const JalApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 짤게시글 등록
export const createJal = async (title, content, files) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  // 여러 파일을 같은 key(files)로 append 해야 DTO의 List<MultipartFile>에 매핑됨
  Object.entries(files).forEach(([KeyboardEvent, file]) => {
    if (file) {
      formData.append("files", file);
    }
  });

  try {
    const response = await JalApi.post("/jals", formData);
    return response.data;
  } catch (error) {
    console.error("createJal 에러: ", error);
    throw error;
  }
};

// 전체 짤게시글 조회
export const getAllBoardJals = async () => {
  try {
    const response = await JalApi.get(`/jals`);
    return response.data;
  } catch (error) {
    console.error("getAllBoardJals 에러: ", error);
    throw error;
  }
};

// id로 짤게시글 상세 조회
export const getBoardJalDetail = async (id) => {
  try {
    const response = await JalApi.get(`/jals/${id}`);
    return response.data;
  } catch (error) {
    console.error("getBoardJalDetail 에러: ", error);
    throw error;
  }
};

export const deleteBoardJal = async (id) => {
  try {
    const response = await JalApi.delete(`/jals/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteBoardJal 에러: ", error);
    throw error;
  }
};