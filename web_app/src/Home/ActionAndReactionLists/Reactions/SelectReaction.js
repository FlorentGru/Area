import React from 'react'
import Discord from './Discord'
import GitHub from './Github'
import Gmail from './Gmail'
import Slack from './Slack'
import Zoho from './Zoho'
import Spotify from './Spotify'

export default class SelectReaction extends React.Component {
    render() {
        const reaction = localStorage.getItem("reaction")
        if (reaction === "Discord")
            return (
                <Discord/>
            )
        if (reaction === "Github") {
            return (
                <GitHub/>
            )
        }
        if (reaction === "Gmail") {
            return (
                <Gmail/>
            )
        }
        if (reaction === "Slack") {
            return (
                <Slack/>
            )
        }
        if (reaction === "Zoho") {
            return (
                <Zoho/>
            )
        }
        if (reaction === "Spotify") {
            return(
                <Spotify/>
            )
        }
        return (
            <div>Une Erreur est survenue: Reaction Inconnue</div>
        )
    }
}