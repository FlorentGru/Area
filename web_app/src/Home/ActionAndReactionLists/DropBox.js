import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class DropBoxForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="70%" left="8%" name="DropBox" type="Action" data={JSON.parse(localStorage.getItem("actions"))["dropbox"]}/>
                <ListAction top="70%" left="20%" name="DropBox" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["dropbox"]}/>
            </div>
        )
    }
}
