import React from 'react'

export default function Message(props) {
    const handleClick = () => {
        props.deleteMessage();
    }

    return (
        <div className="message-container" >
            <h3>{props.message}</h3>
            <button onClick={handleClick}>&#10539;</button>
        </div>
    )
}