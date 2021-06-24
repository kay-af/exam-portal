import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './ExamNavbar.css'

const padStart = (s) => {
    return (s.toString()).padStart(2, 0)
}

const constructTimeString = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60
    seconds = seconds % 60
    return `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`
}

function ExamNavbar(props) {
    const timeString = constructTimeString(props.remainingTime || 120*60)
    return (
        <div className="exam-nav-bar">
            <div className="nav-title"><b>Computer Science Exam II</b></div>
            <div className="nav-timer">
                <Icon name="clock outline"/>
                <b>{timeString}</b>
            </div>
            <Button color="brown" animated="vertical">
                <Button.Content visible>
                    Submit Test
                </Button.Content>
                <Button.Content hidden>
                    <Icon name="check" />
                </Button.Content>
            </Button>
        </div>
    )
}

export default ExamNavbar
