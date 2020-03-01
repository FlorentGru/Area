const axios = require('axios').default

let myReactions = {
    "discord": [],
    "github": [],
    "dropbox": [],
    "gmail": [],
    "slack": [],
    "zoho": [],
    "timer": []
}

export default async function getReactions() {
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost:8081/area/reactions",
        });
        response.data.forEach(element => {
            myReactions[element.service].push(element.name)
        });
        return (myReactions)
    } catch(error) {
        return (400)
    }
}
