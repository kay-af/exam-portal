import React from 'react'

function QuestionOveriewBadge(props) {

    let bg = props.current ? "violet" : props.attempted ? "green" : "#ddd";
    let txtCol = props.current || props.attempted ? "white" : "black"

    return (
        <div onClick={() => props.onClick?.call(props.questionNum)} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bg,
            aspectRatio: "1",
            borderRadius: "6px",
            cursor: "pointer",
            color: txtCol
        }}>
            <b>{props.questionNum}</b>
        </div>
    )
}

export default QuestionOveriewBadge
