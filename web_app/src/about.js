import React from 'react';
import JSONPretty from 'react-json-prettify';


export default class About extends React.Component {
    render() {
        const json = localStorage.getItem("about")
        console.log(json)
        return (
            // <div>oui</div>
            <JSONPretty json={json}/>
        )
    }
}
