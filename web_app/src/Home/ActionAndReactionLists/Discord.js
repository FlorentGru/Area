import React from 'react';
import ListAction from './ListActions'

export default class DiscordList extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="8%" name="Discord" type="Action" data={JSON.parse(localStorage.getItem("actions"))["discord"]}/>
                <ListAction top="10%" left="20%" name="Discord" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["discord"]}/>
            </div>
        )
    }
}
