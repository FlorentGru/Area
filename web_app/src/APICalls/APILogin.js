const axios = require('axios').default;
const login = "http://localhost:8081/auth/login"

export default async function loginUser(user_email, user_password) {
    try {
        const response = await axios({
            method: "post",
            url: login,
            headers: {'Content-Type': 'application/json'},
            data: {
                "email": user_email,
                "password": user_password
            }
        })
        return (response.status)
    } catch(error) {
        alert(`erreur dans l'appel: ${error.status}`)
    }
}
