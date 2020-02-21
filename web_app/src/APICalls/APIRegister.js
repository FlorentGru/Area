const axios = require('axios').default;
const register = "http://localhost:8081/auth/register"

export default async function registerUser(user_name, user_password, user_email) {
    try {
        const response = await axios({
            method: 'post',
            url: register,
            data: {
                "email": user_email,
                "name": user_name,
                "password": user_password
            }
        })
        alert(response.code)
        return (response.code)
    } catch (error) {
        alert(error)
        return (400)
    }
}