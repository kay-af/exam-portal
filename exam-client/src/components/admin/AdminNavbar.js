import React from 'react';
import './AdminNavbar.css';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useCookie } from 'react-use';

function AdminNavbar(props) {

    const history = useHistory()

    const [,,deleteToken] = useCookie('adminToken')

    return (
        <div className="admin-nav-bar">
            <div className="admin-nav-bar-title">
                Online Exam Portal - Admin
            </div>
            <Button onClick={() => {
                deleteToken();
                history.replace('/?q=signIn');
            }} compact color="orange">Logout</Button>
        </div>
    )
}

export default AdminNavbar
