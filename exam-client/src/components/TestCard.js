import React from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import './TestCard.css';
import interpolate from 'color-interpolate'

const cardBottom = (props) => {
    if (props.review) {
        const percent = (props.score / props.maxScore) * 100;
        const lerp = interpolate(['red', 'purple', 'green'])
        const col = lerp(percent / 100)
        return (
            <Card.Content style={{ textAlign: "center", backgroundColor: col, color: "white" }}>
                <div className="card-desc">
                    <div>
                        <Icon name="pencil" />
                        <span>Your score: <b>{props.score}/{props.maxScore}</b></span>
                    </div>
                    <div>
                        <span><b>({percent.toFixed(2)}%)</b></span>
                    </div>
                </div>
            </Card.Content>
        )
    } else {
        return (
            <Card.Content>
                <Button primary animated="vertical" floated="right">
                    <Button.Content visible>
                        Start Test
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name="arrow circle right"></Icon>
                    </Button.Content>
                </Button>
            </Card.Content>
        )
    }
}

function TestCard(props) {
    return (
        <Card className={props.className} fluid raised>
            <Card.Content className="card-head-container">
                <div className="card-head-text">{props.examName}</div>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <div className="card-desc">
                        <div>
                            <Icon name="list" />
                            <span>{props.numQuestions} Questions</span>
                        </div>
                        <div>
                            <Icon name="time" />
                            <span>{props.time} minutes</span>
                        </div>
                        <div>
                            <Icon name="line graph" />
                            <span>Maximum Score: {props.maxScore}</span>
                        </div>
                    </div>
                </Card.Description>
            </Card.Content>
            {cardBottom(props)}
        </Card>
    )
}

export default TestCard