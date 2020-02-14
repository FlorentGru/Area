const axios = require('axios').default;


//URLs:
const login = "localhost:8081/auth/login"
const register = "localhost:8081/auth/register"


//CALLS
export default async function loginUser(user_email, user_password) {
    try {
        const response = await axios.get({
            method: 'get',
            url: login,
            data: {
                email: user_email,
                password: user_password
            }
        })
        alert(response)
    } catch(error) {
        alert(error)
    }
}

async function registerUser(user_name, user_password, user_email) {
    try {
        const response = await axios({
            method: 'post',
            url: register,
            data: {
                username: user_name,
                password: user_password,
                email: user_email,
            }
        })
        alert(response)
    } catch (error) {
        alert(error)
    }
}