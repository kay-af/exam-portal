import React from 'react'
import { Card, Divider, Placeholder } from 'semantic-ui-react'
import TestCard from './TestCard'
import LoadingCard from '../LoadingCard'

const getHeader = (props) => {

    if (props.loading) {
        return (<Placeholder>
            <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
        </Placeholder>
        )
    }

    const name = (props.name?.firstName || "First") + " " + (props.name?.lastName || "Last");
    const email = props.email || "email@email.com";

    return (
        <>
            <h1>Welcome {name}</h1>
            <h3 style={{ color: "violet" }}>{email}</h3>
            <Divider />
            <p>You can take available tests immediately from the panel on the right side!</p>
        </>
    )
}

const getCardGroupWrapper = (child) => {
    return (
        <Card.Group itemsPerRow="two" doubling>
            {child}
        </Card.Group>
    )
}

const getTestHistory = (props) => {

    if (props.loading) {
        return getCardGroupWrapper(
            <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </>
        )
    }

    if (props.testHistory.length === 0) return (<p>Seems like you have not taken any tests yet!</p>)

    return getCardGroupWrapper(props.testHistory.map((test) => {
        return (<TestCard review key={test.id} {...test} />)
    }));
}

export default function StudentStatsPanel(props) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            padding: "16px"
        }}>
            {getHeader(props)}
            <Divider />
            <h1>Your Test History</h1>
            {getTestHistory(props)}
        </div>
    )
}