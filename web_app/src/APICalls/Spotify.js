const axios = require('axios').default

export default async function SpotifyAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: `${localStorage.getItem("address")}/oauth2/spotify?callback=http://localhost:8081/home`,
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
