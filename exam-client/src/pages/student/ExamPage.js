import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dimmer, Divider, Icon, Loader } from 'semantic-ui-react'
import ExamNavbar from '../../components/student/ExamNavbar'
import QuestionBlock from '../../components/student/QuestionBlock'
import QuestionOveriewBadge from '../../components/student/QuestionOveriewBadge'
import useISEResponseAlert from '../../hooks/useISEResponseAlert'
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert'
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler'
import ExamSubmitConfirmModal from '../../modals/ExamSubmitConfirmModal'
import ExamSubmitModal from '../../modals/ExamSubmitModal'
import './ExamPage.css'
import config from '../../config.json';
import ExamNotFoundModal from '../../modals/ExamNotFoundModal'
import { useHistory } from 'react-router-dom'

const initializeResponses = (questions) => {
    return questions.map((q) => {
        return []
    });
}

function ExamPage(props) {

    useUnmountRequestCanceler();
    useISEResponseAlert();
    useUnauthorizedResponseAlert();

    const history = useHistory();

    const [fetchingPaper, setFetchingPaper] = useState(true);
    const [examTimer, setExamTimer] = useState(null);
    const [questionPaper, setQuestionPaper] = useState(null);
    const [examControl, setExamControl] = useState({
        showExamNotFoundModal: false,
        showSubmitConfirmExamModal: false,
        showSubmitModal: false
    });
    const [postSubmitData, setPostSubmitData] = useState({
        show: false,
        attempted: 0,
        score: 0
    })

    const [pageState, setPageState] = useState({
        activeExam: false,
        currentQuestion: 0,
        responses: []
    });

    const examTimerId = useRef(null);

    useEffect(() => {
        axios.get(config.server + "/api/student/exam", {
            withCredentials: true,
            params: {
                id: props.id
            }
        }).then((response) => {
            if (response.status === 200) {
                setExamTimer(response.data.time);
                setQuestionPaper(response.data);
                setPageState({
                    activeExam: true,
                    responses: initializeResponses(response.data.questions),
                    currentQuestion: 0
                });

                console.log(response.data);

                examTimerId.current = setInterval(() => {
                    setExamTimer((prev) => prev - 1);
                }, 1000);
            }
        }).catch((err) => {
            if (err.response?.status === 400 || err.response?.status === 403 || err.response?.status === 404) {
                setExamControl((prev) => {
                    return {
                        ...prev,
                        showExamNotFoundModal: true
                    }
                })
            }
        }).finally(() => {
            setFetchingPaper(false);
        });

        return () => {
            if (examTimerId.current)
                clearInterval(examTimerId.current)
        }
    }, [props.id]);

    const submitExam = useCallback(() => {
        if (examTimerId.current)
            clearInterval(examTimerId.current)
        setExamControl((prev) => {
            return {
                ...prev,
                showSubmitConfirmExamModal: false,
                showSubmitModal: true
            }
        });

        const payload = questionPaper.questions.map((q, idx) => {
            return {
                id: q.id,
                answers: pageState.responses[idx]
            }
        });

        axios.post(config.server + "/api/student/exam", payload, {
            withCredentials: true,
            params: {
                id: questionPaper.id
            }
        }).then((response) => {
            if (response.status === 200) {
                setPostSubmitData({
                    ...response.data,
                    show: true
                });
            }
        }).catch((err) => {
            console.log(err.response);
        });
    }, [pageState, questionPaper])

    useEffect(() => {
        if (examTimer === 0 && examTimerId.current !== null) {
            clearInterval(examTimerId.current);
            setExamControl((prev) => {
                return {
                    ...prev,
                    showSubmitConfirmExamModal: false
                }
            });
            submitExam();
        }
    }, [examTimer, submitExam]);

    let attemptCount = 0;
    pageState.responses.forEach((e) => {
        if (e.length > 0) {
            attemptCount++;
        }
    });

    return (
        <>
            <Dimmer active={fetchingPaper}>
                <Loader>Loading Question Paper</Loader>
            </Dimmer>
            <ExamSubmitModal
                attemptCount={postSubmitData.attempted}
                numQuestions={questionPaper?.numQuestions}
                loading={!postSubmitData.show}
                open={examControl.showSubmitModal}
                score={postSubmitData.score}
                maxScore={questionPaper?.maxScore}
                onClickDashboard={() => {
                    history.replace('/student');
                }}
            />
            <ExamSubmitConfirmModal attemptCount={attemptCount} numQuestions={questionPaper?.numQuestions} onClickCancel={() => {
                setExamControl((prev) => {
                    return {
                        ...prev,
                        showSubmitConfirmExamModal: false
                    }
                });
            }} onClickSubmit={() => {
                submitExam();
            }} open={examControl.showSubmitConfirmExamModal} />
            <ExamNotFoundModal onClickDashboard={() => {
                history.push('/');
            }} open={examControl.showExamNotFoundModal} />
            {
                pageState.activeExam &&
                <div className="exam-page-container">
                    <ExamNavbar onClickSubmit={() => {
                        setExamControl((prev) => {
                            return {
                                ...prev,
                                showSubmitConfirmExamModal: true
                            }
                        });
                    }} remainingTime={examTimer} paperName={questionPaper.paperName} />
                    <div className="exam-page-main-section">
                        <div className="exam-page-question-section">
                            <div>
                                <span className="exam-page-question-num-title">Question {pageState.currentQuestion + 1}</span>
                                <span className="exam-page-question-num-title-total">&nbsp;/ {questionPaper.numQuestions}</span>
                            </div>
                            <Divider />
                            <QuestionBlock
                                questions={questionPaper.questions}
                                responses={pageState.responses}
                                index={pageState.currentQuestion}
                                onChangeResponse={(idx, response) => {
                                    const updated = pageState.responses
                                    updated[idx] = response
                                    setPageState((prev) => {
                                        return {
                                            ...prev,
                                            answers: updated
                                        }
                                    })
                                }} />
                            <Divider />
                            <div>
                                <Button onClick={() => {
                                    const updated = pageState.responses;
                                    updated[pageState.currentQuestion] = [];
                                    setPageState((prev) => {
                                        return {
                                            ...prev,
                                            responses: updated
                                        }
                                    });
                                }} secondary>Clear Response</Button>
                                {
                                    pageState.responses[pageState.currentQuestion].length > 0 &&
                                    <span style={{ paddingLeft: 16, fontSize: "small" }}>
                                        <Icon name="check circle" color="green" />
                                        Attempted
                                    </span>
                                }
                                <Button.Group floated="right">
                                    <Button disabled={pageState.currentQuestion === 0} onClick={() => {
                                        setPageState((prev) => {
                                            return {
                                                ...prev,
                                                currentQuestion: prev.currentQuestion - 1
                                            }
                                        })
                                    }} animated="vertical">
                                        <Button.Content visible>
                                            Previous Question
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="arrow left"></Icon>
                                        </Button.Content>
                                    </Button>
                                    <Button disabled={pageState.currentQuestion === (questionPaper.numQuestions - 1)} onClick={() => {
                                        setPageState((prev) => {
                                            return {
                                                ...prev,
                                                currentQuestion: prev.currentQuestion + 1
                                            }
                                        })
                                    }} positive animated="vertical">
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
                        <div className="exam-page-overview-section">
                            <div>
                                <p>
                                    Click on a <b>tablet</b> with the question number to navigate quickly to the question!
                                </p>
                            </div>
                            <Divider />
                            <div className="exam-page-badge-container">
                                <div className="exam-page-badge-grid">
                                    {pageState.responses.map((e, idx) => {
                                        return (
                                            <QuestionOveriewBadge
                                                onClick={(index) => {
                                                    setPageState((prev) => {
                                                        return {
                                                            ...prev,
                                                            currentQuestion: index
                                                        }
                                                    })
                                                }}
                                                key={questionPaper.questions[idx].id}
                                                attempted={e.length > 0}
                                                current={pageState.currentQuestion === idx}
                                                questionNum={idx + 1} />
                                        )
                                    })}
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <p>
                                    <Icon name="circle" color="green" />
                                    Attempted ({attemptCount}/{questionPaper.numQuestions})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ExamPage