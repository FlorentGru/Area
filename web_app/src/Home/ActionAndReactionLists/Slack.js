import React from "react";
import ListAction from './ListActions'

export default class SlackForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="66%" name="Slack" type="Action" data={JSON.parse(localStorage.getItem("actions"))["slack"]}/>
                <ListAction top="10%" left="78%" name="Slack" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["slack"]}/>
            </div>
        )
    }
}