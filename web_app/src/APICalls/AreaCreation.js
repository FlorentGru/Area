const axios = require('axios').default

export default async function AreaCreation(mydata) {
    try {
        const response = await axios({
            method: "post",
            url: `${localStorage.getItem("address")}/user/areas/new`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
            data: mydata
        });
        console.log(response)
        return (200)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
