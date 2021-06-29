import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import useISEResponseAlert from '../../hooks/useISEResponseAlert';
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import { Icon, Menu } from 'semantic-ui-react';
import AdminDashboard from '../../components/admin/AdminDashboard';
import './AdminLandingPage.css';
import { useHistory } from 'react-router-dom';
import AdminChangeCredential from '../../components/admin/AdminChangeCredential';
import AdminManageQuestion from '../../components/admin/AdminManageQuestion';
import AdminManageStudent from '../../components/admin/AdminManageStudent';

const getMenuItems = (props, history) => {
    const items = [
        {
            iconName: "dashboard",
            label: "Dashboard",
            pageName: "dashboard"
        },
        {
            iconName: "question circle",
            label: "Manage Question Papers",
            pageName: "question"
        },
        {
            iconName: "user",
            label: "View Student Information",
            pageName: "student"
        },
        {
            iconName: "lock",
            label: "Change Credentials",
            pageName: "credential"
        }
    ]
    return [0, 1, 2, 3].map((n) => {
        return (
            <Menu.Item active={props.page === n} onClick={() => {
                if (props.page !== n) {
                    history.push(`/admin/${items[n].pageName}`);
                }
            }} key={n}>
                <Icon name={items[n].iconName} />
                {items[n].label}
            </Menu.Item>
        )
    })
}

function AdminLandingPage(props) {

    useUnmountRequestCanceler();
    useISEResponseAlert();
    useUnauthorizedResponseAlert();

    const history = useHistory();

    return (
        <div className="admin-landing-container">
            <AdminNavbar />
            <div className="admin-landing-content">
                <div className="admin-landing-side-bar">
                    <Menu vertical inverted fluid>
                        {getMenuItems(props, history)}
                    </Menu>
                </div>
                <div className="admin-landing-main-panel">
                    { props.page === 0 && <AdminDashboard /> }
                    {props.page === 1 && <AdminManageQuestion />}
                    {props.page === 2 && <AdminManageStudent />}
                    { props.page === 3 && <AdminChangeCredential />}
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage
