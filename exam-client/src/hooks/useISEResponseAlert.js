import axios from 'axios'
import { useEffect } from 'react'
import config from '../config.json';

function useISEResponseAlert() {

    useEffect(() => {
        const intercept = (err) => {
            if (err.response?.status === 500) {
                alert(config.messages.intervalServerError);
            }
            return Promise.reject(err);
        }
        const id = axios.interceptors.response.use((r) => r, intercept);

        return () => axios.interceptors.response.eject(id);
    }, [])
}

export default useISEResponseAlert
