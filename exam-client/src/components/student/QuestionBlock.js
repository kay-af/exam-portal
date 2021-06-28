import React from 'react'
import { Checkbox, Form, Radio } from 'semantic-ui-react'

const getOptions = (props) => {
    if (props.question.isMultiple) {
        return props.question.options.map((e) => {
            return (
                <Form.Field key={e.key}>
                    <Checkbox
                        onChange={(_, data) => {
                            let res = props.response;
                            if (data.checked) {
                                res.push(data.value);
                            } else {
                                res.splice(res.indexOf(data.value), 1);
                            }
                            props.onChangeResponse(props.index, res);
                        }}
                        checked={props.response.includes(e.key)} value={e.key} label={e.value}></Checkbox>
                </Form.Field>
            )
        });
    } else {
        return props.question.options.map((e) => {
            return (
                <Form.Field key={e.key}>
                    <Radio onChange={(_, data) => {
                        if(data.checked) {
                            props.onChangeResponse(props.index, [data.value]);
                        }
                    }} checked={props.response.includes(e.key)} name="opt-group" value={e.key} label={e.value}></Radio>
                </Form.Field>
            )
        });
    }
}

function QuestionBlock(props) {

    const question = props.questions[props.index]
    const response = props.responses[props.index]

    return (
        <div className={props.className} style={{ flex: 1 }}>
            <p>{question.questionText}</p>
            <div className="option-block">
                <Form>
                    {getOptions({
                        index: props.index,
                        question: question,
                        response: response,
                        onChangeResponse: props.onChangeResponse
                    })}
                </Form>
            </div>
        </div>
    )
}

export default QuestionBlock
