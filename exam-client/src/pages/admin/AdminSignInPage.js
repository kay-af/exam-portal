import React, { useState } from 'react'
import './AdminSignInPage.css'
import AdminSignInCard from '../../components/admin/AdminSignInCard'
import config from '../../config.json';
import axios from 'axios';
import useISEResponseAlert from '../../hooks/useISEResponseAlert';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import { useHistory } from 'react-router-dom';

function AdminSignInPage() {

    useISEResponseAlert();
    useUnmountRequestCanceler();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    return (
        <div class="admin-sigin-container">
            <h1>Admin - Online Exam Portal</h1>
            <p>This page is meant for admins only! If you are a student <a href="/?q=signIn">click here</a>!</p>
            <AdminSignInCard
                loading={loading}
                onChangeUsername={(evt) => {
                    setUsername(evt.target.value);
                    setError(null);
                }}
                onChangePassword={(evt) => {
                    setPassword(evt.target.value);
                    setError(null);
                }}
                error={error} username={username} password={password} onLoginClicked={() => {
                    const payload = {
                        username: username,
                        password: password
                    }

                    setLoading(true);
                    axios.post(config.server + '/auth/admin/login', payload, {
                        withCredentials: true
                    }).then((response) => {
                        if (response.status === 200) {
                            history.push("/admin");
                        }
                    }).catch((err) => {
                        if (err.response?.status === 401) {
                            setLoading(false);
                            setError("Username or password invalid");
                        }
                    });
                }} />
        </div>
    )
}

export default AdminSignInPage
