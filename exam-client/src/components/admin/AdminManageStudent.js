import React, { useEffect, useState } from 'react'
import { Divider, Card } from 'semantic-ui-react';
import axios from 'axios';
import LoadingCard from '../LoadingCard';
import config from '../../config.json';
import { useHistory } from 'react-router';

function AdminManageStudent(props) {

    const history = useHistory();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(config.server + "/api/admin/student", {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data);
                setLoading(false);
            }
        });
    }, []);

    return (
        <div>
            <h1>All Students</h1>
            <Divider />
            {loading && <LoadingCard />}
            {data?.length === 0 && <div>No students registered yet</div>}
            {data?.map((d) => {
                return <div
                onClick={() => {
                    history.push({
                        pathname: "/admin/student",
                        search: `?id=${d.id}`
                    })
                }}
                style={{
                    border: "0.5px solid #1112",
                    backgroundColor: "snow",
                    cursor: "pointer",
                    padding: "16px"
                }} key={d.id} fluid>
                    <h3>
                        {d.name.firstName} {d.name.lastName}
                    </h3>
                    <div style={{ color: "blue" }}>
                        {d.email}
                    </div>
                    <div>
                        Registered on: <b>{new Date(d.timestamp).toLocaleString()}</b>
                    </div>
                </div>
            })}
        </div>
    )
}

export default AdminManageStudent
