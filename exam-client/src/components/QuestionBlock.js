import React from 'react'
import { Checkbox, Form, Radio } from 'semantic-ui-react'

const getOptions = (props) => {
    if (props.isMultipleChoice) {
        return props.options.map((e) => {
            return (
                <Form.Field key={e.key}>
                    <Checkbox value={e.key} label={e.value}></Checkbox>
                </Form.Field>
            )
        });
    } else {
        return props.options.map((e) => {
            return (
                <Form.Field key={e.key}>
                    <Radio name="opt-group" value={e.key} label={e.value}></Radio>
                </Form.Field>
            )
        });
    }
}

function QuestionBlock(props) {
    return (
        <div className={props.className} style={{ flex: 1 }}>
            <p>How many sides are there in a triangle?</p>
            <div className="option-block">
                <Form>
                    <Form.Field>
                        <Radio label="One" value="one" name="opt"></Radio>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label="Two" value="two" name="opt"></Checkbox>
                    </Form.Field>
                </Form>
            </div>
        </div>
    )
}

export default QuestionBlock
