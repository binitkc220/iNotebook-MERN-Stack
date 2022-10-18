import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className="wrapper slide" id="slide">
        <div id="toast_custom" style={{borderLeft: `8px solid ${props.alert.color}`}}>
            <div className="ccontainer-1">
                <i className={`fas ${props.alert.icon}`} style={{color:`${props.alert.color}`}}></i>
            </div>
            <div className="ccontainer-2 mx-2">
                <p>{props.alert.title}</p>
                <h6>{props.alert.msg}</h6>
            </div>
        </div>
    </div>
    )
}