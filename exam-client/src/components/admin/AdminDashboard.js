import React, { useEffect, useState } from 'react'
import { Card, Statistic, Divider } from 'semantic-ui-react';
import AdminDashboardResultCard from './AdminDashboardResultCard';
import config from '../../config.json';
import axios from 'axios';
import LoadingCard from '../LoadingCard';

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
                <LoadingCard />
                <h1>Recent Tests</h1>
                <Card.Group itemsPerRow="3" doubling>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
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
            <Divider />
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
