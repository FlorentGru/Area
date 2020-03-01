import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class TimerForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="40%" left="8%" name="Timer" type="Action" data={JSON.parse(localStorage.getItem("actions"))["timer"]}/>
                <ListAction top="40%" left="20%" name="Timer" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["timer"]}/>
            </div>
        )
    }
}
