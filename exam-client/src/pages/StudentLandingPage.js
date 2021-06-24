import React from 'react'
import AvailableTestsPanel from '../components/AvailableTestsPanel'
import StudentNavbar from '../components/StudentNavbar'
import StudentStatsPanel from '../components/StudentStatsPanel'
import './StudentLandingPage.css'

function StudentLandingPage(props) {
    return (
        <div className="container">
            <StudentNavbar />
            <div className="main-content">
                <div className="stats-div">
                    <StudentStatsPanel />
                </div>
                <div className="tests-div">
                    <AvailableTestsPanel />
                </div>
            </div>
        </div>
    )
}

export default StudentLandingPage