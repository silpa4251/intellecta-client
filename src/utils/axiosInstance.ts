import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // backend url
    withCredentials:true,
    headers: {
        "Content-Type": "application/json"
    }
})

//refreshtoken handle iF so...

export default axiosInstance