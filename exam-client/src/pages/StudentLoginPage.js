import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './CredentialPage.css';
import SignInCard from '../components/SignInCard';
import axios from 'axios';
import config from '../config.json';
import useUnmountRequestCanceler from '../hooks/useUnmountRequestCanceler';

const validateState = (state) => {
    const email = state.email.trim();
    const password = state.password;

    let errors = {
        hasError: false
    };

    const fieldRequiredMessage = "This field is required!";

    if (email.length === 0) {
        errors.emailError = fieldRequiredMessage;
        errors.hasError = true;
    }

    if (password.length === 0) {
        errors.passwordError = fieldRequiredMessage;
        errors.hasError = true;
    }

    return errors;
}

const signInStudent = (payload) => {
    return axios.post(config.server + "/auth/student/login", payload, {
        withCredentials: true
    });
}

function StudentLoginPage(props) {

    useUnmountRequestCanceler();

    const history = useHistory();

    const [signInState, setSignInState] = useState({
        loading: false,
        email: "",
        password: "",
        remeberMe: false,
        emailError: null,
        passwordError: null
    });

    const callbacks = {
        onChangeEmail: (evt) => {
            setSignInState((prev) => {
                return {
                    ...prev,
                    email: evt.target.value,
                    emailError: null,
                }
            });
        },
        onChangePassword: (evt) => {
            setSignInState((prev) => {
                return {
                    ...prev,
                    password: evt.target.value,
                    passwordError: null,
                }
            })
        },
        onCreateAccountClicked: () => {
            history.push('/signUp')
        },
        onLoginClicked: () => {
            const errors = validateState(signInState);

            setSignInState((prev) => {
                return {
                    ...prev,
                    emailError: errors.emailError,
                    passwordError: errors.passwordError
                }
            });

            if (!errors.hasError) {
                const payload = {
                    email: signInState.email,
                    password: signInState.password
                }

                setSignInState((prev) => {
                    return {
                        ...prev,
                        loading: true
                    }
                })
                signInStudent(payload).then((response) => {
                    if (response.status === 200) {
                        history.replace('/student');
                    }
                }).catch((err) => {
                    setSignInState((prev) => {
                        return {
                            ...prev,
                            loading: false
                        }
                    });
                    const status = err.response?.status;
                    if (status === 404) {
                        setSignInState((prev) => {
                            return {
                                ...prev,
                                emailError: "User not found!"
                            }
                        })
                    } else if (status === 401) {
                        setSignInState((prev) => {
                            return {
                                ...prev,
                                passwordError: "Password incorrect"
                            }
                        })
                    } else if(status === 500) {
                        alert(config.messages.intervalServerError);
                    }
                });
            }
        }
    }

    return (
        <div className="credential-container">
            <SignInCard {...signInState} { ...callbacks } />
        </div>
    )
}

export default StudentLoginPage