const axios = require('axios').default;
// const crypto = require('crypto')
// const algorithm = 'aes-256-ecb'
// const key = new Buffer("aed60beab8122e81536c33ec4614d97bb6367d3cd13cadc4e7ed095026aa30d4", 'hex');

// function encrypt(text){
//     let iv = new Buffer('');
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let crypted = cipher.update(text,'utf8','hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

export default async function registerUser(user_name, user_password, user_email) {
    try {
        // const encryptedPassword = encrypt(user_password)
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
        console.log(error)
        console.log(`Impossible de creer le compte: l'adresse email a déjà été utilisée, ou la connection au serveur est impossible`)
        return (400)
    }
}