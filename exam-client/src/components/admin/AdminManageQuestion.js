import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config.json';
import { Divider, Card, Button, ButtonContent, Icon } from 'semantic-ui-react';
import QuestionListCard from './QuestionListCard';
import './AdminManageQuestion.css';
import LoadingCard from '../LoadingCard';
import { useHistory } from 'react-router-dom';

function AdminManageQuestion() {

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(config.server + '/api/admin/questionPaper', {
            withCredentials: true
        }).then((response) => {
            setLoading(false);
            if (response.status === 200) {
                setQuestionList(response.data);
            }
        });
    }, []);

    return (
        <div className="admin-manage-question-container">
            <div className="admin-manage-question-header">
                <h1 className="title">All Question Papers</h1>
                <Button onClick={() => {
                    history.push('/admin/createPaper');
                }} primary animated="vertical">
                    <Button.Content visible>
                        Create Paper
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name="plus"></Icon>
                    </Button.Content>
                </Button>
            </div>
            <Divider />
            <div className="admin-manage-question-content">
                <Card.Group itemsPerRow="2" doubling>
                    {
                        loading &&
                        <>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </>
                    }
                    {
                        !loading &&
                        questionList.map((q, i) => {
                            return <QuestionListCard onDelete={() => {
                                setQuestionList(questionList.filter((_, index) => index !== i));
                            }} key={q.id} {...q} />
                        })
                    }
                </Card.Group>
            </div>
        </div>
    )
}

export default AdminManageQuestion
