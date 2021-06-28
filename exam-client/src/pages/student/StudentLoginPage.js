import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './CredentialPage.css';
import SignInCard from '../../components/student/SignInCard';
import axios from 'axios';
import config from '../../config.json';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import useISEResponseAlert from '../../hooks/useISEResponseAlert';
import { useLocalStorage } from 'react-use';
import { Button, Icon } from 'semantic-ui-react';

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

function StudentLoginPage() {

    useUnmountRequestCanceler();
    useISEResponseAlert();

    const history = useHistory();

    const [rememberMeProps, setRememberMeProps,] = useLocalStorage('rememberMeProps', {
        check: false,
        email: "",
        password: ""
    });

    const [signInState, setSignInState] = useState({
        loading: false,
        email: rememberMeProps.email,
        password: rememberMeProps.password,
        remeberMe: false,
        emailError: null,
        passwordError: null
    });

    const [rememberMe, setRememberMe] = useState(rememberMeProps.check);

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
            history.push({
                pathname: "/",
                search: "?q=signUp"
            });
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

                        if (rememberMe) {
                            setRememberMeProps({
                                check: true,
                                email: signInState.email,
                                password: signInState.password
                            });
                        } else {
                            setRememberMeProps({
                                check: false,
                                email: "",
                                password: ""
                            });
                        }

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
                    }
                });
            }
        },
        onChangeRememberMe: (value) => {
            setRememberMe(value);
        }
    }

    return (
        <div className="credential-container">
            <h1>Online Examination Portal</h1>
            <SignInCard rememberMe={rememberMe} {...signInState} {...callbacks} />
            <Button disabled={signInState.loading} onClick={() => {
                history.push({
                    pathname: '/',
                    search: '?q=signIn&admin=t'
                })
            }} animated="vertical">
                <Button.Content visible>
                    Are you an admin?
                </Button.Content>
                <Button.Content hidden>
                    <Icon name="key" />
                </Button.Content>
            </Button>
        </div>
    )
}

export default StudentLoginPage