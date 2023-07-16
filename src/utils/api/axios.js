import axios from 'axios'
// import {  useSelector } from 'react-redux';
const BASE_URL = 'http://localhost:8080'

// axios.interceptors.request.use(async (config) => {
//     const customHeaders = {};
  
//     const accessToken = useSelector((state)=> state.auth.login.currenUser.accessToken)
//     if (accessToken) {
//       customHeaders.Authorization = accessToken;
//     }
  
//     return {
//       ...config,
//       headers: {
//         ...customHeaders,  // auto attach token
//         ...config.headers, // but you can override for some requests
//       }
//     };
//   });

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
      },
})