import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import StudentLandingPage from '../pages/student/StudentLandingPage';
import ExamPage from '../pages/student/ExamPage';
import qs from 'query-string';

function StudentRouter() {
    return (
        <Switch>
            <Route exact path="/student" component={StudentLandingPage} />
            <Route exact path="/student/exam" render={(props) => {
                const query = qs.parse(props.location.search);
                return <ExamPage id={query.id}></ExamPage>
            }} />
            <Route>
                <Redirect to="/student" />
            </Route>
        </Switch>
    )
}

export default StudentRouter
