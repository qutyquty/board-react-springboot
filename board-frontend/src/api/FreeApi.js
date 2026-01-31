import axios from "axios";
import FreeApi from "./AxiosCommon";

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

// 게시글 수정
export const updateBoardFree = async (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);

  // 삭제할 파일 ID들
  data.filesToDelete.forEach((fileId) => {
    formData.append("filesToDelete", fileId);
  });

  // 새로 업로드한 파일들
  data.files.forEach((file) => {
    if (file instanceof File) {
      formData.append("newFiles", file);
    }
  });

  try {
    const response = await FreeApi.put(`/frees/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("updateBoardFree 에러: ", error);
    throw error;
  }
};