import axios from "axios";

export const instanceAxios = axios.create(
    {
        baseURL: "http://127.0.0.1:8000/api/v0.1"
    }
)