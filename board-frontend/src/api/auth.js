import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot 서버 주소
});

// 회원가입 요청
export const signup = async (user) => {
  console.log(user);
  return await api.post("/auth/signup", user);
};

// 로그인 요청 -> JWT 토큰 반환
export const login = async (user) => {
  return await api.post("/auth/login", user);
};