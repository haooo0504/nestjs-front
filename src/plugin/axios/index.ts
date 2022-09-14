import Axios from "./Axios";
const http = new Axios({
  baseURL: "https://nestjs-now-pi.vercel.app",
  timeout: 5000,
  headers: {},
});

export { http };
