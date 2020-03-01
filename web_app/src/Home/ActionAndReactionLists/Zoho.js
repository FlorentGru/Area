import React from "react";
import ListAction from './ListActions'

export default class ZohoForm extends React.Component {
    render() {
        return (
            <div>
                <ListAction top="40%" left="66%" name="Zoho" type="Action" data={JSON.parse(localStorage.getItem("reactions"))["zoho"]}/>
                <ListAction top="40%" left="78%" name="Zoho" type="Reaction" data={JSON.parse(localStorage.getItem("reactions"))["zoho"]}/>
            </div>
        )
    }
}
