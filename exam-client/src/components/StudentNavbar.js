import React from 'react'
import { Button } from 'semantic-ui-react'
import './StudentNavbar.css';
import { useHistory } from 'react-router-dom'
import { useCookie } from 'react-use';


function StudentNavbar() {

    const history = useHistory()

    const [, , deleteAccessToken] = useCookie('accessToken')

    return (
        <div className="nav-bar">
            <div className="nav-header">
                Online Examination Portal
            </div>
            <Button onClick={() => {
                deleteAccessToken();
                history.replace('/');
            }} compact color="orange">
                Logout
            </Button>
        </div>
    )
}

export default StudentNavbar
