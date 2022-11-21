import axios from "axios";
import Config from "../../constants/config.json";

const instanceAxios = axios.create({
    baseURL: Config.BASE_URL,
});

export default instanceAxios;