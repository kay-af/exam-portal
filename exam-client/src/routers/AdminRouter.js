import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLandingPage from '../pages/admin/AdminLandingPage';

function AdminRouter() {
    return (
        <Switch>
            <Route exact path="/admin/:page" render={(props) => {
                const { page } = props.match.params;
                const pageIndex = ['dashboard', 'question', 'student', 'credential'].indexOf(page);

                if(pageIndex === -1) {
                    return <Redirect to="/admin/dashboard" />
                }

                return <AdminLandingPage page={pageIndex} />
            }} />
            <Route exact path="/admin">
                <Redirect to="/admin/dashboard" />
            </Route>
        </Switch>
    )
}

export default AdminRouter
