import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLandingPage from '../pages/admin/AdminLandingPage';
import QuestionEditor from '../pages/admin/QuestionEditor';
import qs from 'query-string';
import QuestionPaperViewer from '../pages/admin/QuestionPaperViewer';
import StudentViewer from '../pages/admin/StudentViewer';

function AdminRouter() {
    return (
        <Switch>
            <Route exact path="/admin/createPaper" render={(props) => {
                return (
                    <QuestionEditor />
                )
            }} />
            <Route exact path="/admin/:page" render={(props) => {
                const { page } = props.match.params;
                const pageIndex = ['dashboard', 'question', 'student', 'credential'].indexOf(page);

                if (pageIndex === -1) {
                    return <Redirect to="/admin/dashboard" />
                }

                if(pageIndex === 1) {
                    const { id } = qs.parse(props.location.search);
                    if(id) {
                        return <QuestionPaperViewer id={id} />
                    }
                }

                if(pageIndex === 2) {
                    const { id } = qs.parse(props.location.search);
                    if(id) {
                        return <StudentViewer id={id} />
                    }
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
