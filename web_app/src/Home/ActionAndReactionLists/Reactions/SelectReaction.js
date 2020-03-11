import React from 'react'
// import Discord from './Discord'
// import GitHub from './Github'
// import Timer from './Timer'
// import Dropbox from './Dropbox'

export default class SelectReaction extends React.Component {
    render() {
        const reaction = localStorage.getItem("reaction")
        // if (action === "Discord")
        //     return (
        //         <Discord/>
        //     )
        // if (action === "Timer") {
        //     return (
        //         <Timer/>
        //     )
        // }
        // if (action === "Github") {
        //     return (
        //         <GitHub/>
        //     )
        // }
        // if (action === "Dropbox") {
        //     return (
        //         <Dropbox/>
        //     )
        // }
        // else
            return (
                <div>Une Erreur est survenue: Reaction Inconnue</div>
            )
    }
}