import React from 'react';
import { Button, Card, Form } from 'semantic-ui-react';

function SignInCard(props) {

    return (
        <Card>
            <Card.Content>
                <Card.Header style={{ textAlign: "center", textTransform: "uppercase" }} >
                    Sign In
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Form loading={props.loading}>
                    <Form.Field>
                        <Form.Input error={props.emailError} onChange={props.onChangeEmail} placeholder="Email" type="email" value={props.email}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={props.passwordError} onChange={props.onChangePassword} autoComplete="on" placeholder="Password" type="password" value={props.password}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Checkbox checked={props.rememberMe} onChange={(_, data) => props.onChangeRememberMe(data.checked)} label="Remember Me"></Form.Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Button color="blue" fluid onClick={props.onLoginClicked}>Login</Button>
                    </Form.Field>
                    <Form.Field>
                        <Button color="orange" fluid onClick={props.onCreateAccountClicked}>Create Account</Button>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default SignInCard
