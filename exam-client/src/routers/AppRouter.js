import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useCookie } from 'react-use'
import StudentLoginPage from '../pages/student/StudentLoginPage'
import StudentSignUpPage from '../pages/student/StudentSignUpPage'
import qs from 'query-string';
import StudentRouter from './StudentRouter'
import AdminRouter from './AdminRouter'
import AdminSignInPage from '../pages/admin/AdminSignInPage'

function AppRouter() {

    const [accessToken] = useCookie("accessToken");
    const [adminToken] = useCookie("adminToken");

    let isStudent = false;
    let isAdmin = false;

    if (accessToken) {
        isStudent = true;
    }

    if (adminToken) {
        isAdmin = true;
    }

    const isLoggedIn = isStudent || isAdmin;

    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route path='/student' component={StudentRouter} />
                <Route path='/admin' component={AdminRouter} />
                <Route exact path='/' render={(props) => {
                    if (isLoggedIn) {
                        if (isStudent) return <Redirect to="/student" />
                        else return <Redirect to="/admin" />
                    } else {
                        const { q, admin } = qs.parse(props.location.search);

                        if (q === 'signIn') {
                            if (admin === 't') {
                                return <AdminSignInPage />
                            } else {
                                return <StudentLoginPage />
                            }
                        } else if (q === 'signUp') {
                            return <StudentSignUpPage />
                        }

                        return <Redirect to={{
                            pathname: "/",
                            search: qs.stringify({
                                q: 'signIn'
                            })
                        }} />
                    }
                }} />
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter
