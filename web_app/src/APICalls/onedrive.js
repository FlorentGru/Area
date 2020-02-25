const axios = require('axios').default;
const client_id = "ebd055f3-20be-4095-9473-3bdd3efe8e11"
const redirect_uri = "http://localhost:3000/OneDrive"
// const redirect_uri = "https://login.live.com/oauth20_desktop.srf"
const scope = "onedrive.readwrite offline_access"
const url = `https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=code&redirect_uri=${redirect_uri}`

async function call() {
    try {
        const response = await axios.get(url)
        console.log(response)
    } catch (error) {
        console.log(error.status)
    }
}

call();
