import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class DropBoxForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="70%" left="8%" name="DropBox" type="Action" data={data.DropBox.actions}/>
                <ListAction top="70%" left="20%" name="DropBox" type="Reaction" data={data.DropBox.reactions}/>
            </div>
        )
    }
}
