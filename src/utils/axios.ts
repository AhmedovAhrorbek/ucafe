import axios from "axios";
import type { AxiosError } from "axios";
import { settings } from "../configs/settings";
import { refreshToken } from "../features/auth/api";

const request = axios.create({
    baseURL:settings.baseUrl,
    timeout:settings.requestTimeOut,
});

request.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if(token !== null){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, errorHandler);

request.interceptors.response.use((response)=>response.data, errorHandler);

export async function errorHandler(error: AxiosError):Promise<void>{
    if(error.response !== null){
        if(error.response?.status === 403){
            const rToken = localStorage.getItem("refresh_token");
            if(rToken !== null){
                try {
                    const res = await refreshToken({refresh:rToken});
                    const { refresh, access } = res.data;
                    localStorage.setItem("refresh_token", refresh);
                    localStorage.setItem("access_token", access);
                } catch (err) {
                    localStorage.setItem("refresh_token_error", JSON.stringify(err));
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("access_token");
                } finally{
                    window.location.reload();
                }
            }
        }
        await Promise.reject(error.response);
    }
    if(error.request !== null){
        await Promise.reject(error.request);
    }
    console.log(error.message)
    console.log("Error config object:", error.config);
    console.log("\nError object as json", error.toJSON());
    await Promise.reject(error);
}

export default request;