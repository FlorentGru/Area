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

export default async function loginUser(user_email, user_password) {
    try {
        // const encryptedPassword = encrypt(user_password)
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
