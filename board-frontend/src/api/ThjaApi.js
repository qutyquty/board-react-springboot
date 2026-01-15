import axios from "axios";

// Axios 기본 인스턴스 생성
const ThjaApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 게시글 등록
export const createThja = async (title, content, files) => {
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
    console.log("createThja Start!!");
    const response = await ThjaApi.post("/thjas", formData);
    console.log("createThja End!!");
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

// 파일 다운로드
export const downloadFile = async (filePath) => {
  const response = await ThjaApi.get(`/thjas/files`, {
    params: { filePath }, // filePath를 쿼리 파라미터로 전달
    responseType: 'blob',
  });
  return response.data;
};