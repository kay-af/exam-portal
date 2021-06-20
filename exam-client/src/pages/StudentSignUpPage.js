import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Form } from 'semantic-ui-react'

function StudentSignUpPage() {

    const history = useHistory()

    return (
        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Card>
                <Card.Header>
                    <h2 style={{
                        width: "100%",
                        padding: "12px",
                        fontWeight: 100,
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>Sign Up</h2>
                </Card.Header>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <input placeholder="First Name" />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder="Last Name" />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder="Email" type="email"></input>
                        </Form.Field>
                        <Form.Field>
                            <input placeholder="Password" type="password"></input>
                        </Form.Field>
                        <Button fluid color="blue">
                            <Button.Content visible>Sign Up</Button.Content>
                        </Button>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button fluid onClick={() => history.push('/login')} color="violet" >
                        <Button.Content visible>Have an account already?</Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default StudentSignUpPage
