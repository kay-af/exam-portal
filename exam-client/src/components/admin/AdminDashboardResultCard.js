import React from 'react'
import { Button, Card } from 'semantic-ui-react';
import interpolate from 'color-interpolate';
import { useHistory } from 'react-router-dom';

function AdminDashboardResultCard(props) {

    const percent = (props.score / props.maxScore) * 100;
    const lerp = interpolate(['red', 'purple', 'green']);
    const col = lerp(percent / 100);

    const history = useHistory();

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {props.paperName}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <p>
                    Number of questions: <b>{props.numQuestions}</b>
                </p>
                <p>
                    Allowed time: <b>{props.time / 60} minutes</b>
                </p>
                <p>
                    Maximum score: <b>{props.maxScore}</b>
                </p>
            </Card.Content>
            <Card.Content>
                <p>Attempted By: <b>{props.student.name.firstName} {props.student.name.lastName}</b></p>
                <p style={{ color: "blue" }}>{props.student.email}</p>
                <p>Score: <b>{props.score}/{props.maxScore}</b></p>
            </Card.Content>
            <Card.Content style={{ textAlign: "center", backgroundColor: col, color: "white" }}>
                <div>
                    <span><b>Percentage: {percent.toFixed(2)}%</b></span>
                </div>
            </Card.Content>
            <Card.Content>
                <Button.Group fluid>
                    <Button onClick={() => {
                        history.push({
                            pathname: "/admin/question",
                            search: `?id=${props.examId}`
                        })
                    }}>
                        Question Paper
                    </Button>
                    {
                        !props.hideStudentDetailsBtn &&
                        <Button onClick={() => {
                            history.push({
                                pathname: "/admin/student",
                                search: `?id=${props.student.id}`
                            })
                        }} primary>
                            Student Details
                        </Button>
                    }
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default AdminDashboardResultCard
