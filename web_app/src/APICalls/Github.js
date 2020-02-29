const axios = require('axios').default

export default async function GitHubAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost:8081/oauth2/github?callback=http://localhost:3000",
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
