import React from 'react'
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react'

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
            <Modal open={props.open && !props.loading} size="mini">
                <Modal.Header>
                    Your test has been submitted!
                    </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>You attempted <b>{props.attemptCount}/{props.numQuestions}</b> questions</p>
                        <p>Your final score: <b>{finalScoreString(props)}</b></p>
                        <p><em>Your test history will be updated shortly. Proceed to dashboard!</em></p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={props.onClickDashboard} primary>Dashboard</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default ExamSubmitModal
