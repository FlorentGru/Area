const axios = require('axios').default;

export default async function loginUser(user_email, user_password) {
    try {
        const response = await axios({
            method: "post",
            url: `${localStorage.getItem("address")}/user/login`,
            headers: {'Content-Type': 'application/json'},
            data: {
                "email": user_email,
                "password": user_password
            }
        })
        return (response)
    } catch(error) {
        console.log(error)
        console.log("Mauvais mot de passe ou email")
        return (400)
    }
}
