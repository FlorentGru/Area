const axios = require('axios').default

export default async function AreaList() {
    try {
        const response = await axios({
            method: "get",
            url: `${localStorage.getItem("address")}/user/areas`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        });
        return (response)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
