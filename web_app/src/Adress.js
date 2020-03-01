import React from 'react';
import './CSS/login.css'
import putAddress from './APICalls/Adress'

export default class AddressPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {address: null}
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandler = async (event) => {
        event.preventDefault()
        const response = await putAddress(this.state.address)
        if (response !== 400) {
            localStorage.setItem("address", this.state.address)
            this.props.history.push('/Login')
        } else {
            alert("error defining the address")
        }
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler} className="formStyle">
                <p>Enter Ngrok address</p>
                <input
                    type='text'
                    name='address'
                    required={true}
                    onChange={this.myChangeHandler}
                />
                <br/>
                <input type="submit" value="Use this address"/>
            </form>
        )
    }
}
