import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class OneDriveForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="70%" left="8%" name="OneDrive" type="Action" data={data.OneDrive.actions}/>
                <ListAction top="70%" left="20%" name="OneDrive" type="Reaction" data={data.OneDrive.reactions}/>
            </div>
        )
    }
}
