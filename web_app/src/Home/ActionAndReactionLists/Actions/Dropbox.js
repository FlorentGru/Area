import React from "react"

export default class ActionDropbox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            deleted: null,
            create: null,
            rename: null,
            pathChanged: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
    }

    render() {
        return (
            <div>Selectionnez une action de Dropbox
                <form>
                    Deleted <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form>
                    Create <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form>
                    Rename <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form>
                    Path Changed <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
            </div>
        )
    }
}