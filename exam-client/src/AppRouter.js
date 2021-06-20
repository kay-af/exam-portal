import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import StudentCredentialPage from './pages/StudentLoginPage'
import StudentSignUpPage from './pages/StudentSignUpPage'

function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={StudentCredentialPage} />
                <Route exact path='/signUp' component={StudentSignUpPage} />
                <Route>
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter
