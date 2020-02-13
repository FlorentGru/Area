const axios = require('axios').default;


//URLs:
const login = "localhost:8081/auth/login"
const register = "localhost:8081/auth/register"


//CALLS
async function loginUser(name, password) {
    try {
        const response = await axios.get(login)
        console.log(response)
    } catch(error) {
        console.error(error)
    }
}

async function registerUser(name, password, email) {
    try {
        const response = await axios.post(register)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}