import axios from 'axios';
import { BASE_URL } from "../../constants";

const refreshAccessToken = async () => {
    try {
        const url = `${BASE_URL}/user/refresh`;
        const options = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        };
        const response = await axios.get(url, options);
        return response.data.access;
    } catch (error) {
        throw new Error(error);
    }
};

export default refreshAccessToken;
