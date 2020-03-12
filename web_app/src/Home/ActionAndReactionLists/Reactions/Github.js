import React from "react"

export default class ReactionGmail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: null,
            repo: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.owner)
        console.log(this.repo)
    }

    render() {
        return (
            <div>Selectionnez une action de Github
                <form>
                    Issue <br/>
                    owner
                    <input type="text" name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}