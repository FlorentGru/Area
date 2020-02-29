import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class OutlookForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="Outlook" type="Action" data={data.Outlook.actions}/>
                <ListAction name="Outlook" type="Reaction" data={data.Outlook.reactions}/>
            </div>
        )
    }
}
