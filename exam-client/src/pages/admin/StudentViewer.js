import React, { useEffect, useState } from 'react'
import useISEResponseAlert from '../../hooks/useISEResponseAlert'
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import { Dimmer, Card, Loader, Button, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config.json';
import { useHistory } from 'react-router-dom';
import './QuestionPaperViewer.css';
import AdminDashboardResultCard from '../../components/admin/AdminDashboardResultCard';

function StudentViewer(props) {

    useISEResponseAlert();
    useUnauthorizedResponseAlert();
    useUnmountRequestCanceler();

    const history = useHistory();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(config.server + "/api/admin/student", {
            withCredentials: true,
            params: {
                id: props.id
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data);
            }
        }).catch((err) => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
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
                        Failed to load data! Please try again!
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => {
                        history.push({
                            pathname: "/admin/question"
                        })
                    }} primary>
                        Dashboard
                    </Button>
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
                        <b style={{ flex: 1 }}>{data.name.firstName} {data.name.lastName}</b>
                        <Button onClick={() => {
                            history.push("/admin/question");
                        }} compact primary>Go to dashboard</Button>
                    </div>
                    <div style={{
                        flex: 1,
                        height: "0px",
                        width: "100%",
                        padding: "16px",
                        overflow: "auto"
                    }}>
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
                                        Student ID: <b>{data.id}</b>
                                    </div>
                                    <div>
                                        <Icon name="id card outline"></Icon>
                                        Student Name: <b>{data.name.firstName} {data.name.lastName}</b>
                                    </div>
                                    <div>
                                        <Icon name="mail"></Icon>
                                        Email: <b>{data.email}</b>
                                    </div>
                                    <div>
                                        <Icon name="list"></Icon>
                                        Tests taken: <b>{data.testHistory.length}</b>
                                    </div>
                                    <div>
                                        <Icon name="clock"></Icon>
                                        Registered on: <b>{new Date(data.timestamp).toLocaleString()}</b>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        <h1>Tests Taken</h1>
                        <Card.Group itemsPerRow="3" doubling>
                            {data.testHistory.map((t) => {
                                return <AdminDashboardResultCard hideStudentDetailsBtn student={{
                                    name: data.name,
                                    email: data.email
                                }} key={t.examId} {...t} />
                            })}
                        </Card.Group>
                    </div>
                </>
            }
        </div>
    )
}

export default StudentViewer
