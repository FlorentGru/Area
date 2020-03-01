import React from "react";
import data from '../../data.json'
import ListAction from './ListActions'

export default class GitHubList extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="37%" name="GitHub" type="Action" data={data.GitHub.actions}/>
                <ListAction top="10%" left="49%" name="GitHub" type="Reaction" data={data.GitHub.reactions}/>
            </div>
        )
    }
} 

