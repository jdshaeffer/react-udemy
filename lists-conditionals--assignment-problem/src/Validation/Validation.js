import React from 'react';

const validation = (props) => {
    let validationMessage = "text long enough";
    if(props.length <= 5)
    {
        validationMessage = "text too short";
    }
    return (
        <div>
            <p><b>{validationMessage}</b></p>
            <p>length: {props.length}</p>
        </div>
    )
}

export default validation;