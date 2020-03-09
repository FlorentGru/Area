import React from 'react'
import Discord from './Discord'
// import GitHub from './Github'
// import Slack from './Slack'
// import Timer from './Timer'
// import Zoho from './Zoho'
// import Dropbox from './Dropbox'
// import Gmail from './Gmail'

export default class SelectAction extends React.Component {
    render() {
        const action = localStorage.getItem("action")
        if (action === "Discord")
            return (
                <Discord/>
            )
        else
            return (
                <div>Action Inconnue</div>
            )
    }
}