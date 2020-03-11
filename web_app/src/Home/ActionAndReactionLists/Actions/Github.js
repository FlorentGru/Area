import React from "react"

export default class ActionGithub extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: null,
            repo: null,
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
            <div>Selectionnez une action de Github
                <form>
                    Push <br/>
                    owner
                    <input type="text" name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form>
                    Push <br/>
                    owner
                    <input type="text" name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
            </div>
        )
    }
}