import axios from "axios";
// "http://192.168.10.35:8000/api"
 const baseURL = axios.create({
  baseURL: "http://139.59.92.140:3232/api/v1",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar", authorization: `Bearer ${localStorage.getItem("token")}` },

})

export default baseURL;