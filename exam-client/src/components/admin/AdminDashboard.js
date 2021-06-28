import React, { useEffect, useState } from 'react'
import { Card, Statistic, Placeholder } from 'semantic-ui-react';
import AdminDashboardResultCard from './AdminDashboardResultCard';
import config from '../../config.json';
import axios from 'axios';

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

function AdminDashboard() {

    const [dashboardInfo, setDashboardInfo] = useState({
        loading: true
    });

    useEffect(() => {
        axios.get(config.server + '/api/admin/info', {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setDashboardInfo({
                    loading: false,
                    ...response.data
                });
            }
        });
    }, []);

    if (dashboardInfo.loading) {
        return (
            <>
                {getLoadingCard()}
                <h1>Recent Tests</h1>
                <Card.Group itemsPerRow="3" doubling>
                    {getLoadingCard()}
                    {getLoadingCard()}
                    {getLoadingCard()}
                    {getLoadingCard()}
                    {getLoadingCard()}
                    {getLoadingCard()}
                </Card.Group>
            </>
        )
    }

    return (
        <>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Statistics
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Statistic.Group size="tiny">
                        <Statistic>
                            <Statistic.Value>
                                {dashboardInfo.numStudents}
                            </Statistic.Value>
                            <Statistic.Label>
                                Registered Students
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>
                                {dashboardInfo.activeTests}
                            </Statistic.Value>
                            <Statistic.Label>
                                Active tests
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>
                                {dashboardInfo.totalTests}
                            </Statistic.Value>
                            <Statistic.Label>
                                Total Tests Taken
                            </Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Card.Content>
            </Card>
            <h1>Recent Tests</h1>
            {dashboardInfo.testHistory.length === 0 ?
                (<p>No one took any tests yet!</p>) :
                (
                    <Card.Group itemsPerRow="3" doubling>
                        {dashboardInfo.testHistory.map((t) => <AdminDashboardResultCard key={t.examId} {...t} onClick={() => { }} />)}
                    </Card.Group>
                )}
        </>
    )
}

export default AdminDashboard
