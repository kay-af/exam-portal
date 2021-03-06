import axios from 'axios'
import { useEffect } from 'react'

function useUnmountRequestCanceler() {

    useEffect(() => {
        const cancelers = []
        const interceptor = (config) => {
            const cancelToken = new axios.CancelToken((canceler) => cancelers.push(canceler));
            config.cancelToken = cancelToken;
            return config;
        }
        const id = axios.interceptors.request.use(interceptor);
        return () => {
            cancelers.forEach((cancel) => cancel());
            axios.interceptors.request.eject(id);
        }
    }, []);
}

export default useUnmountRequestCanceler
