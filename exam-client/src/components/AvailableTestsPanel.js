import React from 'react'
import { Card } from 'semantic-ui-react'
import TestCard from './TestCard'

function AvailableTestsPanel() {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: "16px"
        }}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Available Tests
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <p>These new tests are available to take immediately!</p>
                </Card.Content>
            </Card>
            <TestCard examName="Computer Science I" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Electronics I" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
            <TestCard examName="Computer Science II" numQuestions={25} time={120} maxScore={35} />
        </div>
    )
}

export default AvailableTestsPanel
