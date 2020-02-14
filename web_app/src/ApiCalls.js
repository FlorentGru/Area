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

async function registerUser(user_name, user_password, user_email) {
    try {
        const response = await axios({
            method: 'get',
            url: register,
            data: {
                username: user_name,
                password: user_password,
                email: user_email,
            }
        })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}