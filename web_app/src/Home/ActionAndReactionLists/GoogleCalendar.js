import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class GoogleCalendarForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="66%" name="GoogleCalendar" type="Action" data={data.GoogleCalendar.actions}/>
                <ListAction top="10%" left="78%" name="GoogleCalendar" type="Reaction" data={data.GoogleCalendar.reactions}/>
            </div>
        )
    }
}
