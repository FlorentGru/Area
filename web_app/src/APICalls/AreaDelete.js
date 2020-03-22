const axios = require('axios').default

export default async function AreaDelete(id) {
    try {
        await axios({
            method: "delete",
            url: `${localStorage.getItem("address")}/user/areas/delete?areaId=${id}`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        });
        return (200)
    } catch(error) {
        console.log(error)
        return (400)
    }
}
