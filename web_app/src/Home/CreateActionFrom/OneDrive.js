import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class OneDriveForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="OneDrive" type="Action" data={data.OneDrive.actions}/>
                <ListAction name="OneDrive" type="Reaction" data={data.OneDrive.reactions}/>
            </div>
        )
    }
}
