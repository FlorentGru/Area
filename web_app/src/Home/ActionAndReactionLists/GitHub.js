import React from "react";
import ListAction from './ListActions'

export default class GitHubList extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="37%" name="GitHub" type="Action" data={JSON.parse(localStorage.getItem("actions"))["github"]}/>
                <ListAction top="10%" left="49%" name="GitHub" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["github"]}/>
            </div>
        )
    }
} 

