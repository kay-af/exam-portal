import React from 'react'

function QuestionOveriewBadge(props) {

    let bg = props.current ? "violet" : props.attempted ? "green" : "#ddd";
    let txtCol = props.current || props.attempted ? "white" : "black"
    if(props.attempted && props.current) {
        bg = "purple"
    }

    return (
        <div onClick={() => props.onClick(props.questionNum - 1)} style={{
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
