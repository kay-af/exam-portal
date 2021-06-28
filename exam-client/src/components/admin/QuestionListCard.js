import React from 'react'
import { Card, Checkbox, Icon, Button } from 'semantic-ui-react';

function QuestionListCard(props) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {props.paperName}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <p>
                    <Icon name="question" />
                    Number of questions: <b>{props.numQuestions}</b>
                </p>
                <p>
                    <Icon name="clock" />
                    Allowed time: <b>{props.time / 60} minutes</b>
                </p>
                <p>
                    <Icon name="dollar" />
                    Maximum score: <b>{props.maxScore}</b>
                </p>
                <p>
                    <Icon name="random" />
                    Shuffleable: <b>{props.shuffleable ? "Yes" : "No"}</b>
                </p>
            </Card.Content>
            <Card.Content>
                <Checkbox checked={props.visibleToStudent} label="Visible to students?">
                </Checkbox>
            </Card.Content>
            <Card.Content>
                Created at: <b>{(new Date(props.timestamp)).toDateString()}</b>
            </Card.Content>
            <Card.Content>
                <Button.Group floated="right">
                    <Button>
                        Delete
                    </Button>
                    <Button>
                        Details
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default QuestionListCard
