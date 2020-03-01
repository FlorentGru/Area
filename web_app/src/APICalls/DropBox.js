const axios = require('axios').default

export default async function DropBoxAuth(token) {
    try {
        const response = await axios({
            method: "get",
            url: `${localStorage.getItem("address")}/oauth2/dropbox?callback=http://localhost:3000/home`,
            headers: {'Authorization': `Bearer ${token}`},
        });
        return (response.data.data)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
