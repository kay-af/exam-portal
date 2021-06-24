import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useCookie } from 'react-use'
import { TokenProvider } from '../contexts/TokenContext'
import ExamPage from '../pages/ExamPage'
import StudentLandingPage from '../pages/StudentLandingPage'
import StudentLoginPage from '../pages/StudentLoginPage'
import StudentSignUpPage from '../pages/StudentSignUpPage'

function AppRouter() {

    const [accessToken] = useCookie("accessToken")
    const [adminToken] = useCookie("adminToken")

    let isStudent = false;
    let isAdmin = false;

    if (accessToken) {
        isStudent = true;
    }

    if (adminToken && !isStudent) {
        isAdmin = true;
    }

    const isLoggedIn = isStudent || isAdmin;

    return (
        <TokenProvider value={{
            accessToken: accessToken,
            adminToken: adminToken
        }}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/student' component={StudentLandingPage} />
                    <Route exact path='/student/exam' component={ExamPage} />
                    <Route exact path='/admin' />
                    <Route exact path='/signIn' render={() => {
                        if (!isLoggedIn) {
                            return (
                                <StudentLoginPage />
                            )
                        } else {
                            return (
                                <Redirect to="/" />
                            )
                        }
                    }} />
                    <Route exact path='/signUp' render={() => {
                        if (!isLoggedIn) {
                            return (
                                <StudentSignUpPage />
                            )
                        } else {
                            return (
                                <Redirect to="/" />
                            )
                        }
                    }} />
                    <Route render={() => {
                        if (isStudent) {
                            return (
                                <Redirect to="/student" />
                            )
                        } else if (isAdmin) {
                            return (
                                <Redirect to="/admin" />
                            )
                        } else {
                            return (
                                <Redirect to="/signIn" />
                            )
                        }
                    }} />
                </Switch>
            </BrowserRouter>
        </TokenProvider>
    )
}

export default AppRouter
