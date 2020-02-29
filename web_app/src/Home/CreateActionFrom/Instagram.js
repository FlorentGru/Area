import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class InstagramForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="Instagram" type="Action" data={data.Instagram.actions}/>
                <ListAction name="Instagram" type="Reaction" data={data.Instagram.reactions}/>
            </div>
        )
    }
}
