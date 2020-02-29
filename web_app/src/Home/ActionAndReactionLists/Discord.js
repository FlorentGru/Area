import React from 'react';
import data from '../../data.json'
import ListAction from './ListActions'
import '../../CSS/home.css'

export default class DiscordList extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="10%" left="8%" name="Discord" type="Action" data={data.Discord.actions}/>
                <ListAction top="10%" left="20%" name="Discord" type="Reaction" data={data.Discord.reactions}/>
            </div>
        )
    }
}
