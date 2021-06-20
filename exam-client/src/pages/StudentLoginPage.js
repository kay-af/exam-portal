import React from 'react'
import { useHistory } from 'react-router-dom'
import 'semantic-ui-react'
import { Button, Card, Form  } from 'semantic-ui-react'

function StudentLoginPage() {

    const history = useHistory()

    return (
        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Card>
                <Card.Header>
                    <h2 style={{
                        width: "100%",
                        padding: "12px",
                        fontWeight: 100,
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>Sign In</h2>
                </Card.Header>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <input placeholder="Email" type="email"></input>
                        </Form.Field>
                        <Form.Field>
                            <input placeholder="Password" type="password"></input>
                        </Form.Field>
                        <Button fluid color="blue">
                            <Button.Content visible>Sign in</Button.Content>
                        </Button>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button fluid color="orange" onClick={() => history.push('/signUp')}>
                        <Button.Content visible>Create account</Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default StudentLoginPage