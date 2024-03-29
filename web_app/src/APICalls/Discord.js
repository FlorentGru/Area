const axios = require('axios').default

export default async function DiscordAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: `${localStorage.getItem("address")}/oauth2/discord?callback=http://localhost:8081/home`,
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
