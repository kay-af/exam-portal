import React, { useMemo, useState } from 'react'
import useISEResponseAlert from '../../hooks/useISEResponseAlert';
import useUnauthorizedResponseAlert from '../../hooks/useUnauthorizedResponseAlert';
import useUnmountRequestCanceler from '../../hooks/useUnmountRequestCanceler';
import './QuestionEditor.css';
import { Form, Card, Button, Icon } from 'semantic-ui-react';
import QuestionEditorCard from './QuestionEditorCard';
import crypto from 'crypto';
import axios from 'axios';
import config from '../../config.json';
import { Prompt, useHistory } from 'react-router-dom';

const randomString = () => {
    return crypto.randomBytes(16).toString('hex');
}

const brandNewQuestion = () => {
    return {
        key: randomString(),
        questionText: "",
        optionKeys: [
            {
                key: randomString(),
                value: ""
            },
            {
                key: randomString(),
                value: ""
            }
        ],
        answers: [],
        shuffleable: false,
        score: 1
    }
}

const validateBasicProps = (basicProps) => {

    let error = null;
    if (basicProps.paperName.trim().length < 2) {
        error = "Too short!";
    }
    else if (basicProps.paperName.trim().length >= 32) {
        error = "Too long!";
    }

    return {
        hasError: error !== null,
        error: {
            paperNameError: error
        }
    }
}

const validateQuestions = (questionList) => {
    let hasError = false;
    const errors = questionList.map((q) => {
        const questionError = q.questionText.trim().length > 0 ? null : "This field is required"

        hasError = hasError || questionError !== null

        if (q.answers.length === 0) {
            const optionError = "Atleast one option is required to be checked";
            hasError = true;

            return {
                questionError: questionError,
                optionsError: q.optionKeys.map((opt, i) => {
                    if (i === 0) {
                        return {
                            error: optionError
                        }
                    } else {
                        return {
                            error: null
                        }
                    }
                })
            }
        } else {
            return {
                questionError: questionError,
                optionsError: q.optionKeys.map((o, i) => {

                    let error = null;
                    if (o.value.trim().length === 0) {
                        error = "Remove extra options or populate them";
                    }

                    hasError = hasError || error !== null

                    return {
                        error: error
                    }
                })
            }
        }
    })

    return {
        hasError: hasError,
        errors: errors
    }
}

function QuestionEditor(props) {

    useISEResponseAlert();
    useUnauthorizedResponseAlert();
    useUnmountRequestCanceler();

    const history = useHistory()

    const [questionList, setQuestionList] = useState([
        brandNewQuestion()
    ]);

    const [basicProps, setBasicProps] = useState({
        paperName: "",
        time: 2 * 30 * 60,
        shuffleable: false
    });

    const onClickAddQuestion = () => {
        setQuestionList((prev) => {
            return [...prev, brandNewQuestion()];
        });
    }

    const questionEditorCallbacks = useMemo(() => {
        return {
            onChangeQuestionText: (index, value) => {
                setQuestionList((prev) => {
                    prev[index] = {
                        ...prev[index],
                        questionText: value
                    }
                    return [
                        ...prev
                    ]
                });
            },
            onRemoveQuestion: (index) => {
                setQuestionList((prev) => {
                    const arr = [...prev]
                    arr.splice(index, 1)
                    return [
                        ...arr
                    ]
                });
            },
            onChangeOptionText: (index, opt, value) => {
                setQuestionList((prev) => {
                    const arr = [...prev];
                    const optionKeys = [...arr[index].optionKeys];
                    optionKeys[opt].value = value;
                    arr[index] = {
                        ...arr[index],
                        optionKeys: [...optionKeys]
                    }
                    return [...arr];
                });
            },
            onChangeAnswer: (index, opt, checked) => {
                setQuestionList((prev) => {
                    const arr = [...prev]
                    const answers = [...arr[index].answers];
                    if (checked) {
                        answers.push(arr[index].optionKeys[opt].key)
                    } else {
                        const ind = answers.indexOf(arr[index].optionKeys[opt].key)
                        if (ind !== -1) {
                            answers.splice(ind, 1);
                        }
                    }
                    arr[index] = {
                        ...arr[index],
                        answers: [...answers]
                    };

                    return [...arr]
                })
            },
            onRemoveOption: (index, opt) => {
                setQuestionList((prev) => {
                    const arr = [...prev];
                    const optionKeys = [...arr[index].optionKeys];
                    optionKeys.splice(opt, 1);
                    arr[index] = {
                        ...arr[index],
                        optionKeys: [...optionKeys]
                    }
                    return [...arr];
                });
            },
            onAddOption: (index) => {
                setQuestionList((prev) => {
                    const arr = [...prev];
                    const optionKeys = [...arr[index].optionKeys];
                    optionKeys.push({
                        key: randomString(),
                        value: ""
                    });
                    arr[index] = {
                        ...arr[index],
                        optionKeys: [...optionKeys]
                    }
                    return [...arr];
                })
            },
            onChangeShuffleable: (index, checked) => {
                setQuestionList((prev) => {
                    const arr = [...prev];
                    arr[index].shuffleable = checked;
                    return [...arr];
                })
            },
            onChangeScore: (index, score) => {
                const sc = Math.max(1, Math.min(score, 5));
                setQuestionList((prev) => {
                    const arr = [...prev];
                    arr[index].score = sc;
                    return [...arr]
                })
            }
        }
    }, []);

    const [listErrors, setListErrors] = useState([]);
    const [basicErrors, setBasicErrors] = useState({
        paperNameError: null
    });

    const [exitPrompt, setExitPrompt] = useState(true);

    const onSavePaper = () => {
        const quesListErrors = validateQuestions(questionList);
        const quesBasicErrors = validateBasicProps(basicProps);

        setListErrors(quesListErrors.errors);
        setBasicErrors(quesBasicErrors.error);

        if (quesListErrors.hasError || quesBasicErrors.hasError) return;

        const payload = {
            ...basicProps,
            questions: questionList
        }

        axios.post(config.server + "/api/admin/questionPaper", payload, {
            withCredentials: true
        }).then((response) => {
            if(response.status === 201) {
                setExitPrompt(false);
                alert("Question paper created!");
                history.push("/admin/question");
            }
        })
    }

    return (
        <div className="qe-container">
            <Prompt when={exitPrompt} message="Exit page? All unsaved changes will be lost."></Prompt>
            <div style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#222",
                color: "white",
                fontSize: "large",
                boxShadow: "0px 1px 2px #4442",
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <b style={{ flex: 1 }}>Question Paper Creator</b>
                <Button onClick={() => {
                    history.go(-1);
                }} compact negative>Quit</Button>
            </div>
            <div className="qe-content">
                <div className="qe-basic-props">
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Basic Properties
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Form>
                                <Form.Field>
                                    <Form.Input onChange={(evt, data) => {
                                        setBasicProps((prev) => {
                                            return {
                                                ...prev,
                                                paperName: data.value
                                            }
                                        })
                                    }} error={basicErrors.paperNameError} placeholder="Paper Name" value={basicProps.paperName}></Form.Input>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Dropdown onChange={(evt, data) => {
                                        setBasicProps((prev) => {
                                            return {
                                                ...prev,
                                                time: data.value
                                            }
                                        })
                                    }} selection value={basicProps.time} options={[30 * 60, 60 * 60, 2 * 60 * 60, 3 * 60 * 60].map((m) => {
                                        return {
                                            key: m,
                                            text: Math.floor(m / 60) + ' minutes',
                                            value: m
                                        }
                                    })} />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Checkbox checked={basicProps.shuffleable} onChange={(_, data) => setBasicProps((prev) => {
                                        return {
                                            ...prev,
                                            shuffleable: data.checked
                                        }
                                    })} label="Can Shuffle"></Form.Checkbox>
                                </Form.Field>
                            </Form>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Overall Info
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <div className="qe-card-desc">
                                <div>
                                    <Icon name="question" />
                                    Questions: <b>{questionList.length}</b>
                                </div>
                                <div>
                                    <Icon name="pencil" />
                                    Maximum marks: <b>{questionList.reduce(function (a, b) { return a + b.score }, 0)}</b>
                                </div>
                            </div>
                        </Card.Content>
                        <Card.Content>
                            <Button onClick={onSavePaper} primary fluid animated="vertical">
                                <Button.Content visible>
                                    Save Paper
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="save"></Icon>
                                </Button.Content>
                            </Button>
                        </Card.Content>
                    </Card>
                </div>
                <div className="qe-questions-panel">
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Add / Remove Questions
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            You can add or remove questions by clicking the corresponding buttons
                        </Card.Content>
                    </Card>
                    {questionList.map((q, i) => {
                        return <QuestionEditorCard errors={listErrors[i]} {...questionEditorCallbacks} allowRemoveQuestion={questionList.length > 1} index={i} {...q} />
                    })}
                    <Button disabled={questionList.length >= 100} onClick={onClickAddQuestion} primary floated="right">Add Question</Button>
                </div>
            </div>
        </div>
    )
}

export default QuestionEditor
