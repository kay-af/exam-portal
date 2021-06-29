import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Menu, Dimmer, Table, Loader, Modal, Card, Icon, Checkbox } from 'semantic-ui-react';
import useISEResponseAlert from '../../hooks/useISEResponseAlert'
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import axios from 'axios';
import config from '../../config.json';
import './QuestionPaperViewer.css';

function QuestionPaperViewer(props) {

    useISEResponseAlert();
    useUnmountRequestCanceler();
    useUnauthorizedResponseAlert();

    const history = useHistory();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [menu, setMenu] = useState(props.ranklist ? 1 : 0);

    useEffect(() => {
        axios.get(config.server + "/api/admin/questionPaper", {
            withCredentials: true,
            params: {
                id: props.id
            }
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data);
            }
        }).catch((err) => {
            setError(true);
        }).finally(() => setLoading(false));
    }, [props.id]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
        }}>
            <Dimmer active={loading}>
                <Loader>Loading Information</Loader>
            </Dimmer>
            <Modal size="mini" open={error}>
                <Modal.Header>
                    Oops
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Could not get data from the server at the moment or this paper might have been deleted! Try again later!
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => history.push("/admin/question")}>Back to dashboard</Button>
                </Modal.Actions>
            </Modal>
            {
                data &&
                <>
                    <div style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "#222",
                        color: "white",
                        fontSize: "large",
                        boxShadow: "0px 1px 2px #4442",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <b style={{ flex: 1 }}>Question Paper - {data.paperName}</b>
                        <Button onClick={() => {
                            history.push("/admin/question");
                        }} compact primary>Go to dashboard</Button>
                    </div>
                    <div style={{
                        width: "100%",
                        padding: "16px"
                    }}>
                        <Menu>
                            <Menu.Item active={menu === 0} onClick={() => setMenu(0)}>
                                Question Review
                            </Menu.Item>
                            <Menu.Item active={menu === 1} onClick={() => setMenu(1)}>
                                Rank List
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div style={{
                        flex: 1,
                        height: "0px",
                        width: "100%",
                        padding: "16px",
                        overflow: "auto"
                    }}>
                        {
                            menu === 0 &&
                            <>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header>
                                            Basic Information
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <div className="qpv-card-desc">
                                            <div>
                                                <Icon name="id card outline"></Icon>
                                                Paper ID: <b>{data.id}</b>
                                            </div>
                                            <div>
                                                <Icon name="paperclip"></Icon>
                                                Paper name: <b>{data.paperName}</b>
                                            </div>
                                            <div>
                                                <Icon name="list"></Icon>
                                                Number of questions: <b>{data.questions.length}</b>
                                            </div>
                                            <div>
                                                <Icon name="time"></Icon>
                                                Allowed time: <b>{data.time / 60} Minutes</b>
                                            </div>
                                            <div>
                                                <Icon name="clock"></Icon>
                                                Created on: <b>{new Date(data.timestamp).toLocaleString()}</b>
                                            </div>
                                            <div>
                                                <Icon name="star"></Icon>
                                                Maximum score: <b>{data.maxScore}</b>
                                            </div>
                                            <div>
                                                <Icon name="users"></Icon>
                                                Number of attempts: <b>{data.attemptCount}</b>
                                            </div>
                                            <div>
                                                <Icon name="eye"></Icon>
                                                Active: <b>{data.visibleToStudent ? "Yes" : "No"}</b>
                                            </div>
                                            <div>
                                                <Icon name="random"></Icon>
                                                Can be shuffled: <b>{data.shuffleable ? "Yes" : "No"}</b>
                                            </div>
                                        </div>
                                    </Card.Content>
                                </Card>
                                {data.questions.map((q, i) => {
                                    return <Card key={q.id} fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                Question {i + 1}
                                            </Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                {q.questionText}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content>
                                            {q.options.map((opt) => {
                                                return <div key={opt.id} style={{
                                                    paddingTop: 8,
                                                    paddingBottom: 8
                                                }}>
                                                    <Checkbox disabled checked={q.answers.includes(opt.key)} label={opt.value}></Checkbox>
                                                </div>
                                            })}
                                        </Card.Content>
                                        <Card.Content>
                                            <div className="qpv-card-desc">
                                                <div>
                                                    <Icon name="star"></Icon>
                                                    Score: {q.score}
                                                </div>
                                                <div>
                                                    <Icon name="random"></Icon>
                                                    Can be shuffled: {q.shuffleable ? "Yes" : "No"}
                                                </div>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                })}
                            </>
                        }
                        {
                            menu === 1 &&
                            <>
                                <h2>{data.paperName}-Ranklist</h2>
                                <h3>Total attempts: {data.attemptCount}</h3>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width="1">Rank</Table.HeaderCell>
                                            <Table.HeaderCell width="3">First Name</Table.HeaderCell>
                                            <Table.HeaderCell width="3">Last Name</Table.HeaderCell>
                                            <Table.HeaderCell>Email</Table.HeaderCell>
                                            <Table.HeaderCell width="2">Score ({data.maxScore})</Table.HeaderCell>
                                            <Table.HeaderCell width="3">Taken on</Table.HeaderCell>
                                            <Table.HeaderCell width="1">View</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            data.attempts.map((attempt, i) => {
                                                return (
                                                    <Table.Row key={attempt.id}>
                                                        <Table.Cell>{i+1}</Table.Cell>
                                                        <Table.Cell>{attempt.name.firstName}</Table.Cell>
                                                        <Table.Cell>{attempt.name.lastName}</Table.Cell>
                                                        <Table.Cell style={{ color: "blue" }}>{attempt.email}</Table.Cell>
                                                        <Table.Cell>{attempt.score}</Table.Cell>
                                                        <Table.Cell>{new Date(attempt.timestamp).toLocaleString()}</Table.Cell>
                                                        <Table.Cell><Button primary basic compact onClick={() => {
                                                            history.push({
                                                                pathname: "/admin/student",
                                                                search: `?id=${attempt.id}`
                                                            })
                                                        }} icon={"eye"} /></Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default QuestionPaperViewer
