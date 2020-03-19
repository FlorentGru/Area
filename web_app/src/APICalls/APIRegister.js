const axios = require('axios').default;

export default async function registerUser(user_name, user_password, user_email) {
    try {
        const response = await axios({
            method: "post",
            url: `${localStorage.getItem("address")}/user/register`,
            headers: {'Content-Type': 'application/json'},
            data: {
                "email": user_email,
                "name": user_name,
                "password": user_password
            }
        })
        return (response.status)
    } catch (error) {
            console.log(`Impossible de creer le compte: l'adresse email a déjà été utilisée, ou la connection au serveur est impossible`)
        return (400)
    }
}