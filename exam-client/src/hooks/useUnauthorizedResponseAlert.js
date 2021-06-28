import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookie } from 'react-use';
import config from '../config.json';

function useUnauthorizedResponseAlert() {

    const history = useHistory();

    const alertedRef = useRef(false);

    const [, , deleteAccessToken] = useCookie('accessToken')
    const [, , deleteAdminToken] = useCookie('adminToken')

    useEffect(() => {
        const intercept = (err) => {
            if (err.response?.status === 401) {
                deleteAccessToken();
                deleteAdminToken();
                if (!alertedRef.current) {
                    alertedRef.current = true;
                    alert(config.messages.unauthorized);
                }
                history.push('/signIn');
            }
            return Promise.reject(err);
        }

        const id = axios.interceptors.response.use((r) => r, intercept);

        return () => axios.interceptors.response.eject(id);
    }, [deleteAccessToken, deleteAdminToken, history]);
}

export default useUnauthorizedResponseAlert
