import React from "react";
import ListAction from './ListActions'

export default class GmailForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="70%" left="66%" name="Gmail" type="Action" data={JSON.parse(localStorage.getItem("actions"))["gmail"]}/>
                <ListAction top="70%" left="78%" name="Gmail" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["gmail"]}/>
            </div>
        )
    }
}
