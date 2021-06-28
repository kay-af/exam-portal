import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ExamNotFoundModal(props) {
    return (
        <Modal size="mini" open={props.open}>
            <Modal.Header>
                Exam not found
            </Modal.Header>
            <Modal.Content>
                The exam you are trying to access is not available!
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClickDashboard} primary>Go to Dashboard</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ExamNotFoundModal
