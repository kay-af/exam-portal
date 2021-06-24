import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ExamSubmitConfirmModal(props) {
    return (
        <Modal className={props.className} open={props.open} size="mini">
            <Modal.Content>
                <Modal.Header>
                    <h1>Submit Test</h1>
                </Modal.Header>
            </Modal.Content>
            <Modal.Content>
                <Modal.Description>
                    <p>Are you sure you want to submit?</p>
                    <p>You have attempted <b>{props.attemptCount}/{props.numQuestions}</b> questions</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Content>
                <Button.Group fluid>
                    <Button onClick={props.onClickCancel} negative>Cancel</Button>
                    <Button onClick={props.onClickSubmit} positive>Submit</Button>
                </Button.Group>
            </Modal.Content>
        </Modal>
    )
}

export default ExamSubmitConfirmModal
