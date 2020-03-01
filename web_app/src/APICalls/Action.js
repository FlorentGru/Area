const axios = require('axios').default

let myActions = {
    "discord": [],
    "github": [],
    "dropbox": [],
    "gmail": [],
    "slack": [],
    "zoho": [],
    "timer": []
}

export default async function getActions() {
    try {
        const response = await axios({
            method: "get",
            url: `${localStorage.getItem("address")}/area/actions`,
        });
        response.data.forEach(element => {
            myActions[element.service].push(element.name)
        });
        return (myActions)
    } catch(error) {
        return (400)
    }
}
