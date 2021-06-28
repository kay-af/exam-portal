import React from 'react'
import { Button, Card, Form } from 'semantic-ui-react'

function SignUpCard(props) {
    return (
        <Card>
            <Card.Content>
                <Card.Header style={{ textAlign: "center", textTransform: "uppercase" }} >
                    Sign Up
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Form loading={props.loading}>
                    <Form.Field>
                        <Form.Input error={props.firstNameError} placeholder="First Name" onChange={props.onChangeFirstName} value={props.firstName}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={props.lastNameError} placeholder="Last Name" onChange={props.onChangeLastName} value={props.lastName}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={props.emailError} placeholder="Email" onChange={props.onChangeEmail} value={props.email}></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input error={props.passwordError} placeholder="Password" autoComplete="on" onChange={props.onChangePassword} value={props.password} type="password"></Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Button color="orange" fluid onClick={props.onCreateAccountClicked}>Create Account</Button>
                    </Form.Field>
                    <Form.Field>
                        <Button color="blue" fluid onClick={props.onLoginClicked}>Login instead?</Button>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default SignUpCard
