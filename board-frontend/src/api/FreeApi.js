import axios from "axios";

// Axios 기본 인스턴스 생성
const FreeApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 게시글 등록
export const createFree = async (title, content, files) => {
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
    const response = await FreeApi.post("/frees", formData);
    return response.data;
  } catch (error) {
    console.error("createFree 에러: ", error);
    throw error;
  }
};

// 전체 게시글 조회
export const getAllBoardFrees = async () => {
  try {
    const response = await FreeApi.get(`/frees`);
    return response.data;
  } catch (error) {
    console.error("getAllBoardFrees 에러: ", error);
    throw error;
  }
};

// id로 게시글 상세 조회
export const getBoardFreeDetail = async (id) => {
  try {
    const response = await FreeApi.get(`/frees/${id}`);
    return response.data;
  } catch (error) {
    console.error("getBoardFreeDetail 에러: ", error);
    throw error;
  }
};

// id로 게시글 삭제
export const deleteBoardFree = async (id) => {
  try {
    const response = await FreeApi.delete(`/frees/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteBoardFree 에러: ", error);
    throw error;
  }
};

// 파일 다운로드
export const downloadFile = async (filePath) => {
  const response = await FreeApi.get(`/frees/files`, {
    params: { filePath }, // filePath를 쿼리 파라미터로 전달
    responseType: 'blob',
  });
  return response.data;
};