const axios = require('axios').default

export default async function putAddress(address) {
    try {
        const response = await axios({
            method: "put",
            url: `${address}/config/address?address=${address}`    
        })
        return (response.data)
        } catch (error) {
            console.log(error)
            return (400)
    }
}
