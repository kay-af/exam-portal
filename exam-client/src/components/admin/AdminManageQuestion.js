import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config.json';
import { Card, Placeholder } from 'semantic-ui-react';
import QuestionListCard from './QuestionListCard';

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
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

function AdminManageQuestion() {

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
        <div>
            <h1>All Question Papers</h1>
            <Card.Group itemsPerRow="2" doubling>
                {
                    loading &&
                    <>
                        {getLoadingCard()}
                        {getLoadingCard()}
                        {getLoadingCard()}
                        {getLoadingCard()}
                    </>
                }
                {
                    !loading &&
                    questionList.map((q) => {
                        return <QuestionListCard key={q.id} {...q} />
                    })
                }
            </Card.Group>
        </div>
    )
}

export default AdminManageQuestion
