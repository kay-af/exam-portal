import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Checkbox, Icon, Button, Form } from 'semantic-ui-react';
import './QuestionListCard.css';
import config from '../../config.json';
import { useHistory } from 'react-router-dom';

function QuestionListCard(props) {

    const history = useHistory();

    const [visible, setVisible] = useState(props.visibleToStudent);
    const [loading, setLoading] = useState(false);

    return (
        <Card as={Form} loading={loading}>
            <Card.Content>
                <Card.Header>
                    {props.paperName}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <div className="ql-card-desc">
                    <div>
                        <Icon name="question" />
                        Number of questions: <b>{props.numQuestions}</b>
                    </div>
                    <div>
                        <Icon name="clock" />
                        Allowed time: <b>{props.time / 60} minutes</b>
                    </div>
                    <div>
                        <Icon name="dollar" />
                        Maximum score: <b>{props.maxScore}</b>
                    </div>
                    <div>
                        <Icon name="random" />
                        Shuffleable: <b>{props.shuffleable ? "Yes" : "No"}</b>
                    </div>
                </div>
            </Card.Content>
            <Card.Content>
                <div className="ql-card-desc">
                    <Checkbox onChange={(_, data) => {
                        setLoading(true);
                        axios.post(config.server + '/api/admin/paperVisibility', {}, {
                            withCredentials: true,
                            params: {
                                id: props.id,
                                set: data.checked
                            }
                        }).then((response) => {
                            if (response.status === 200) {
                                setLoading(false);
                                setVisible(data.checked);
                            }
                        });
                    }} toggle type="checkbox" checked={visible} label="Visible to students?">
                    </Checkbox>
                    <b>{(new Date(props.timestamp)).toLocaleString()}</b>
                </div>
            </Card.Content>
            <Card.Content>
                <Button onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${props.paperName}?`)) {
                        setLoading(true);
                        axios.delete(config.server + "/api/admin/questionPaper", {
                            withCredentials: true,
                            params: {
                                id: props.id
                            }
                        }).then(() => {
                            props.onDelete();
                            setLoading(false);
                        });
                    }

                }} negative>
                    <Button.Content>
                        <Icon name="trash alternate"></Icon>
                    </Button.Content>
                </Button>
                <Button onClick={() => {
                    history.push({
                        pathname: "/admin/question",
                        search: `?id=${props.id}`
                    })
                }} positive floated="right" animated="vertical">
                    <Button.Content visible>
                        Paper Details
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name="paperclip"></Icon>
                    </Button.Content>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default QuestionListCard