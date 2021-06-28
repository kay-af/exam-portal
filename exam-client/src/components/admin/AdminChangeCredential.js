import axios from 'axios';
import React, { useState } from 'react'
import { Card, Form, Button } from 'semantic-ui-react';
import config from '../../config.json';

function AdminChangeCredential() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorOld, setErrorOld] = useState(null);
    const [errorNew, setErrorNew] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    Change Password
                </Card.Header>
            </Card.Content>
            <Card.Content>
                You can change your password from this screen.
            </Card.Content>
            <Card.Content>
                <Form loading={loading}>
                    <Form.Field>
                        <Form.Input error={errorOld} value={oldPassword} type="password" onChange={(evt) => {
                            setOldPassword(evt.target.value);
                            setErrorOld(null);
                            setErrorNew(null);
                        }} autoComplete="off" placeholder="Old Password" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={errorNew} value={newPassword} type="password" onChange={(evt) => {
                            setNewPassword(evt.target.value);
                            setErrorOld(null);
                            setErrorNew(null);
                        }} autoComplete="off" placeholder="New Password" />
                    </Form.Field>
                    <Button onClick={() => {
                        if (oldPassword.length < 4) {
                            return setErrorOld("Password too short");
                        }
                        if (newPassword.length < 4) {
                            return setErrorNew("Password too short")
                        }

                        setLoading(true);
                        axios.put(config.server + '/api/admin/credentials', {
                            password: oldPassword,
                            newPassword: newPassword
                        }, {
                            withCredentials: true
                        }).then((response) => {
                            if(response.status === 201) {
                                alert("Password changed!");
                                setOldPassword("");
                                setNewPassword("");
                                setErrorOld(null);
                                setErrorNew(null);
                            }
                        }).catch(err => {
                            if(err.response?.status === 403) {
                                setErrorOld("Password incorrect");
                            }
                        }).finally(() => {
                            setLoading(false);
                        })
                    }} negative floated="right">
                        Confirm
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default AdminChangeCredential
