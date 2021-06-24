import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import TestCard from './TestCard'

export default function StudentStatsPanel(props) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            padding: "16px"
        }}>
            <h1>Welcome Afridi Kayal</h1>
            <h3 style={{ color: "violet" }}>kayalafridi@gmail.com</h3>
            <Divider />
            <p>You can take available tests immediately from the panel on the right side!</p>
            <Divider />
            <h1>Your Test History</h1>
            <Card.Group itemsPerRow="two" doubling>
                <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} score={33} review />
                <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} score={30} review />
                <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} score={22} review />
                <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} score={15} review />
                <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} score={8} review />
            </Card.Group>
        </div>
    )
}