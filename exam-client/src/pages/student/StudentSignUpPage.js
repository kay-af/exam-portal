import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignUpCard from '../../components/student/SignUpCard';
import './CredentialPage.css';
import axios from 'axios';
import config from '../../config.json';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import useISEResponseAlert from '../../hooks/useISEResponseAlert';

const validateState = (state) => {
    const fName = state.firstName.trim();
    const lName = state.lastName.trim();
    const email = state.email;
    const password = state.password;

    let errors = {
        hasError: false
    };

    const nameLengthErrorMsg = "Must be 1-32 characters long!";
    const invalidEmailMsg = "Please provide a valid email!";
    const passwordLengthErrorMsg = "Must be 5-64 characters long!";

    if (fName.length === 0 || fName.length > 32) {
        errors.firstNameError = nameLengthErrorMsg;
        errors.hasError = true;
    }

    if (lName.length === 0 || lName.length > 32) {
        errors.lastNameError = nameLengthErrorMsg;
        errors.hasError = true;
    }

    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!reg.test(email)) {
        errors.emailError = invalidEmailMsg;
        errors.hasError = true;
    }

    if (password.length < 5 || password.length > 64) {
        errors.passwordError = passwordLengthErrorMsg;
        errors.hasError = true;
    }

    return errors;
}

const signUpStudent = (payload) => {
    return axios.post(config.server + "/auth/student/create", payload);
}

function StudentSignUpPage() {
    
    useUnmountRequestCanceler();
    useISEResponseAlert();

    const history = useHistory();

    const [signUpState, setSignUpState] = useState({
        loading: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        passwordError: null
    });

    const callbacks = {
        onLoginClicked: () => {
            history.push('/?q=signIn');
        },
        onChangeFirstName: (evt) => {
            setSignUpState((prev) => {
                return {
                    ...prev,
                    firstName: evt.target.value,
                    firstNameError: null
                }
            })
        },
        onChangeLastName: (evt) => {
            setSignUpState((prev) => {
                return {
                    ...prev,
                    lastName: evt.target.value,
                    lastNameError: null
                }
            })
        },
        onChangeEmail: (evt) => {
            setSignUpState((prev) => {
                return {
                    ...prev,
                    email: evt.target.value,
                    emailError: null
                }
            })
        },
        onChangePassword: (evt) => {
            setSignUpState((prev) => {
                return {
                    ...prev,
                    password: evt.target.value,
                    passwordError: null
                }
            })
        },
        onCreateAccountClicked: () => {
            const errors = validateState(signUpState);

            setSignUpState((prev) => {
                return {
                    ...prev,
                    firstNameError: errors.firstNameError,
                    lastNameError: errors.lastNameError,
                    emailError: errors.emailError,
                    passwordError: errors.passwordError
                }
            });

            if (!errors.hasError) {
                const payload = {
                    firstName: signUpState.firstName.trim(),
                    lastName: signUpState.lastName.trim(),
                    email: signUpState.email,
                    password: signUpState.password
                };

                setSignUpState((prev) => {
                    return {
                        ...prev,
                        loading: true
                    }
                })
                signUpStudent(payload).then((response) => {
                    if (response.status === 201) {
                        alert(config.messages.accountCreated);
                        history.push({
                            pathname: "/",
                            search: "?q=signIn"
                        });
                    }
                }).catch((err) => {
                    setSignUpState((prev) => {
                        return {
                            ...prev,
                            loading: false
                        }
                    });
                    const status = err.response?.status;
                    if (status === 400) {
                        setSignUpState((prev) => {
                            return {
                                ...prev,
                                emailError: "This email is already in use!"
                            }
                        })
                    }
                });
            }
        }
    }

    return (
        <div className="credential-container">
            <h1>Online Examination Portal</h1>
            <SignUpCard {...signUpState} {...callbacks} />
        </div>
    )
}

export default StudentSignUpPage
