import React from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Placeholder } from 'semantic-ui-react'
import TestCard from './TestCard'

const getLoadingCard = () => {
    return (
        <Card raised fluid>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Card.Content>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='medium' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

const getAvailableTests = (props, startTest) => {
    if (props.loading) {
        return <>
            {getLoadingCard()}
            {getLoadingCard()}
        </>
    }

    if (props.examList.length === 0) {
        return (
            <Card fluid color="red" raised>
                <Card.Content>
                    <Card.Description>
                        Seems Like there are no tests available to take at the moment!
                </Card.Description>
                </Card.Content>
            </Card>
        )
    }

    return props.examList.map((test) => {
        return (<TestCard onStartTest={() => startTest(test.id)} key={test.id} {...test} />)
    })
}

function AvailableTestsPanel(props) {

    const history = useHistory();

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
            {getAvailableTests(props, (id) => {
                history.push(`/student/exam?id=${id}`);
            })}
        </div>
    )
}

export default AvailableTestsPanel
