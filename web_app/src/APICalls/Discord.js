const axios = require('axios').default

export default async function DiscordAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost:8081/oauth2/discord?callback=http://localhost:3000/home",
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
