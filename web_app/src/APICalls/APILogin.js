const axios = require('axios').default;
const login = "localhost:8081/auth/login"

export default async function loginUser(user_email, user_password) {
    try {
        const response = await axios({
            method: 'post',
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
