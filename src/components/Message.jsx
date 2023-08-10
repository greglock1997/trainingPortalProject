import React from 'react'

export default function Message(props) {
    return (
        <div className="message-container" >
            <h3>{props.message}</h3>
        </div>
    )
}