import axios from "axios";
import { redirect } from "react-router-dom";
// const navigate=useNavigate();
const axiosInstance = axios.create({
    baseURL : 'http://127.0.0.1:8000/',
})

const RefreshAccessToken = async () => {
    try {
        const refresh_token = localStorage.getItem('refresh_token')
        console.log(refresh_token)
        const response = await axios.post('http://127.0.0.1:8000/accounts/refreshtoken/',{refresh_token})
        const newAccessToken = response.data.access_token
        localStorage.setItem('access_token',newAccessToken)
        return newAccessToken
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
        
    }
} 

axiosInstance.interceptors.request.use(
    async (config) => {
        const access_token = localStorage.getItem('access_token')
        const contentType = config.headers['content-type'] 
        if (access_token) {
            config.headers = {
                ...config.headers,
                "Content-Type": !contentType && "application/json",
                "Authorization": `Bearer ${access_token}`
            }
          
        }
        return config
    },
    (error) => {
        console.log("return error")
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const IsAuthenticated=localStorage.getItem("IsAuthenticated")
        console.log(IsAuthenticated)
        const OriginalRequest = error.config
        console.log(error.response)
        if (error.response && error.response.status === 401 && !OriginalRequest._retry&&IsAuthenticated) {
            OriginalRequest._retry = true
            try {
                const newAccessToken = await RefreshAccessToken()
                OriginalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axios(OriginalRequest)
            } catch (error) {
                console.error('Error refreshing token:', error.message);
                console.error(error);
                return Promise.reject(error.message);
            }
        }
        redirect("/login");
        console.error('Error:', error)
        return Promise.reject(error)
    }
)

export default axiosInstance;