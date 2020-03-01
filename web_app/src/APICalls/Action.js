const axios = require('axios').default

let myActions = {
    "discord": [],
    "github": [],
    "dropbox": [],
    "gmail": [],
    "sclack": []
}

export default async function getActions() {
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost:8081/area/actions",
        });
        response.data.forEach(element => {
            myActions[element.service].push(element.name)
        });
        return (myActions)
    } catch(error) {
        return (400)
    }
}
