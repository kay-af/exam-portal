import React from 'react'
import { Button, Dimmer, Loader, Modal, Segment } from 'semantic-ui-react'

const finalScoreString = (props) => {
    const scoreString = `${props.score}/${props.maxScore}`;
    const percent = ((props.score / props.maxScore) * 100).toFixed(2);

    return `${scoreString} (${percent}%)`
}

function ExamSubmitModal(props) {
    return (
        <>
            <Dimmer active={props.open && props.loading}>
                <Loader>
                    Submitting your test... Don't refresh this page.
                </Loader>
            </Dimmer>
            <Modal open={props.open && !props.loading} size="mini" style={{ textAlign: "center" }}>
                <Modal.Content>
                    <Modal.Header>
                        <h3>Your test has been submitted!</h3>
                    </Modal.Header>
                </Modal.Content>
                <Modal.Content>
                    <Modal.Description>
                        <p>You attempted <b>{props.attemptCount}/{props.numQuestions}</b> questions</p>
                        <p>Your final score: <b>{finalScoreString(props)}</b></p>
                        <p><em>Your test history will be updated shortly. Proceed to dashboard!</em></p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Content>
                    <Button onClick={props.onClickDashboard} primary fluid>Dashboard</Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ExamSubmitModal
