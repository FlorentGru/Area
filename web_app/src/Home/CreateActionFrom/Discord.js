import React from 'react';
import data from '../../data.json'
import ListAction from './ListActions'

export default class DiscordForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction name="Discord" type="Action" data={data.Discord.actions}/>
                <ListAction name="Discord" type="Reaction" data={data.Discord.reactions}/>
            </div>
        )
    }
}
