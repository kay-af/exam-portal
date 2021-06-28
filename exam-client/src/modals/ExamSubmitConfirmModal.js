import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ExamSubmitConfirmModal(props) {
    return (
        <Modal className={props.className} open={props.open} size="mini">
            <Modal.Header>
                Submit Test
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>Are you sure you want to submit?</p>
                    <p>You have attempted <b>{props.attemptCount}/{props.numQuestions}</b> questions</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClickCancel} negative>Cancel</Button>
                <Button onClick={props.onClickSubmit} positive>Submit</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ExamSubmitConfirmModal
