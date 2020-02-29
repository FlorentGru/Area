import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class MessengerForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="40%" left="66%" name="Messenger" type="Action" data={data.Messenger.actions}/>
                <ListAction top="40%" left="78%" name="Messenger" type="Reaction" data={data.Messenger.reactions}/>
            </div>
        )
    }
}
