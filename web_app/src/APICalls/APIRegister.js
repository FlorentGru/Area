const axios = require('axios').default;
const register = "http://localhost:8081/auth/register"

export default async function registerUser(user_name, user_password, user_email) {
    try {
        const response = await axios({
            method: "post",
            url: register,
            headers: {'Content-Type': 'application/json'},
            data: {
                "email": user_email,
                "name": user_name,
                "password": user_password
            }
        })
        return (response.status)
    } catch (error) {
        alert(error)
    }
}