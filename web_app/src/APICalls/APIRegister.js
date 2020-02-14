const axios = require('axios').default;
const register = "localhost:8081/auth/register"

export default async function registerUser(user_name, user_password, user_email) {
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