import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AvailableTestsPanel from '../../components/student/AvailableTestsPanel'
import StudentNavbar from '../../components/student/StudentNavbar'
import StudentStatsPanel from '../../components/student/StudentStatsPanel'
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler'
import './StudentLandingPage.css';
import config from '../../config.json';
import useISEResponseAlert from '../../hooks/useISEResponseAlert'
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert'

function StudentLandingPage(props) {

    useUnmountRequestCanceler();
    useISEResponseAlert();
    useUnauthorizedResponseAlert();

    const [userInfo, setUserInfo] = useState({
        loading: true,
        name: null,
        email: null,
        testHistory: null
    });

    const [examList, setExamList] = useState({
        loading: true,
        examList: []
    });

    useEffect(() => {
        axios.get(config.server + '/api/student/info', {
            withCredentials: true
        }).then((response) => {
            if(response.status === 200) {
                setUserInfo({
                    loading: false,
                    ...response.data
                });
            }
        }).catch((err) => {
            console.log(err.message);
        });

        axios.get(config.server + '/api/student/examList', {
            withCredentials: true
        }).then((response) => {
            if(response.status === 200) {
                setExamList({
                    loading: false,
                    examList: response.data
                });
            }
        });
    }, []);

    return (
        <div className="student-landing-container">
            <StudentNavbar />
            <div className="student-landing-main-content">
                <div className="student-landing-stats-div">
                    <StudentStatsPanel {...userInfo} />
                </div>
                <div className="student-landing-tests-div">
                    <AvailableTestsPanel {...examList} />
                </div>
            </div>
        </div>
    )
}

export default StudentLandingPage