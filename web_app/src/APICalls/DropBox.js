const axios = require('axios').default

export default async function DropBoxAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost:8081/oauth2/dropbox?callback=http://localhost:3000/home",
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
