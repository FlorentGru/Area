import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class GoogleCalendarForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="GoogleCalendar" type="Action" data={data.GoogleCalendar.actions}/>
                <ListAction name="GoogleCalendar" type="Reaction" data={data.GoogleCalendar.reactions}/>
            </div>
        )
    }
}
