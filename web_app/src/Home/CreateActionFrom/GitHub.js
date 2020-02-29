import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class GitHubForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="GitHub" type="Action" data={data.GitHub.actions}/>
                <ListAction name="GitHub" type="Reaction" data={data.GitHub.reactions}/>
            </div>
        )
    }
} 

