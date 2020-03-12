import React from "react"

export default class ReactionGmail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dest: null,
            subject: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.dest)
        console.log(this.subject)
    }

    render() {
        return (
            <div>Selectionnez une action de Gmail
                <form>
                    Send To <br/>
                    dest
                    <input type="text" name="dest" onChange={this.myChangeHandler}/> <br/>
                    subject
                    <input type="text" name="subject" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}