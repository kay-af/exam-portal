import React from 'react'
import { Card, Form, TextArea, Button, Icon } from 'semantic-ui-react';

function QuestionEditorCard(props) {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <div style={{ flex: 1 }}>
                        Question {props.index + 1}
                    </div>
                    <Button disabled={!props.allowRemoveQuestion} onClick={() => props.onRemoveQuestion(props.index)} negative>Remove Question</Button>
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Field>
                        <Form.TextArea error={props.errors?.questionError} onChange={(evt) => props.onChangeQuestionText(props.index, evt.target.value)} value={props.questionText} placeholder="Question Text" style={{ minHeight: 80 }}></Form.TextArea>
                    </Form.Field>
                    <Form.Field>
                        {
                            props.optionKeys.map((o, optIndex) => {
                                return (
                                    <Form.Group key={o.key} style={{ alignItems: "center" }}>
                                        <Form.Checkbox onChange={(evt, data) => props.onChangeAnswer(props.index, optIndex, data.checked) } checked={props.answers.includes(o.key)}></Form.Checkbox>
                                        <Form.Input error={props.errors?.optionsError[optIndex]?.error} onChange={(evt) => props.onChangeOptionText(props.index, optIndex, evt.target.value)} value={o.value} placeholder="Option" width="16"></Form.Input>
                                        <Button disabled={props.optionKeys.length <= 2} onClick={() => props.onRemoveOption(props.index, optIndex)} negative>
                                            <Button.Content>
                                                <Icon name="trash alternate"></Icon>
                                            </Button.Content>
                                        </Button>
                                    </Form.Group>
                                )
                            })
                        }
                    </Form.Field>
                    <Button disabled={props.optionKeys.length >= 10} onClick={() => {
                        props.onAddOption(props.index);
                    }}>Add Option</Button>
                </Form>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Field>
                        <Form.Checkbox onChange={(_, data) => props.onChangeShuffleable(props.index, data.checked)} checked={props.shuffleable} label="Shuffle Options" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input onChange={(evt) => props.onChangeScore(props.index, evt.target.value)} label="Score" labelPosition="left" width="3" value={props.score} type="number" />
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default QuestionEditorCard
