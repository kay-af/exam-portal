import React from 'react'
import { Button, Divider, Icon } from 'semantic-ui-react'
import ExamNavbar from '../components/ExamNavbar'
import QuestionBlock from '../components/QuestionBlock'
import QuestionOveriewBadge from '../components/QuestionOveriewBadge'
import ExamSubmitConfirmModal from '../modals/ExamSubmitConfirmModal'
import ExamSubmitModal from '../modals/ExamSubmitModal'
import './ExamPage.css'

function ExamPage(props) {
    return (
        <div className="container">
            <ExamSubmitModal />
            <ExamSubmitConfirmModal />
            <ExamNavbar />
            <div className="main-section">
                <div className="question-section">
                    <div>
                        <span className="question-num-title">Question 1</span>
                        <span className="question-num-title-total">&nbsp;/ 26</span>
                    </div>
                    <Divider />
                    <QuestionBlock />
                    <Divider />
                    <div>
                        <Button secondary>Clear Response</Button>
                        <span style={{ paddingLeft: 16, fontSize: "small" }}>
                            <Icon name="check circle" color="green" />
                            Attempted
                        </span>
                        <Button.Group floated="right">
                            <Button animated="vertical">
                                <Button.Content visible>
                                    Previous Question
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow left"></Icon>
                                </Button.Content>
                            </Button>
                            <Button positive animated="vertical">
                                <Button.Content visible>
                                    Next Question
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow right"></Icon>
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </div>
                </div>
                <div className="overview-section">
                    <div>
                        <p>
                            Click on a <b>tablet</b> with the question number to navigate quickly to the question!
                        </p>
                    </div>
                    <Divider />
                    <div className="content-container">
                        <div className="content-grid">
                            <QuestionOveriewBadge current questionNum={10} />
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <p>
                            <Icon name="circle" color="green" />
                            Attempted (0/26)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamPage