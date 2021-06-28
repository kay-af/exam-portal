import React from 'react'
import { Card, Form, Button } from 'semantic-ui-react';

function AdminSignInCard(props) {
    return (
        <Card>
            <Card.Content>
                <Form loading={props.loading}>
                    <Form.Field>
                        <Form.Input onChange={props.onChangeUsername} placeholder="Username" type="username" value={props.username}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={props.error} onChange={props.onChangePassword} autoComplete="on" placeholder="Password" type="password" value={props.password}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Button color="blue" fluid onClick={props.onLoginClicked}>Login</Button>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default AdminSignInCard
