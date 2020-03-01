const axios = require('axios').default

export default async function DiscordMessage() {
    try {
        const response = await axios({
            method: "post",
            url: `${localStorage.getItem("address")}/area/new`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
            data: {
                "action": {
                    "service": "timer",
                    "name": "countdown",
                    "params" : [
                        {
                            "name": "hours",
                            "value": 0
                        },
                        {
                            "name": "minutes",
                            "value": 1
                        },
                        {
                            "name": "message",
                            "value": "Hello Word"
                        }
                    ]
                },
                "reaction": {
                    "service": "gmail",
                    "name": "sendTo",
                    "params" : [
                        {
                            "name": "dest",
                            "value": "lucas.huet-de-guerville@epitech.eu"
                        },
                        {
                            "name": "subject",
                            "value": "Area"
                        }
                    ]
                }
            }
        });
        console.log(response)
        return (200)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
