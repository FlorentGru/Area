const axios = require('axios').default;
const client_id = "ebd055f3-20be-4095-9473-3bdd3efe8e11"
const redirect_uri = "http://localhost:3000/OneDrive"
// const redirect_uri = "https://login.live.com/oauth20_desktop.srf"
const scope = ["openid", "profile", "User.Read"]
const url = `https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=code&redirect_uri=${redirect_uri}`


console.log(url);
// const complete_url = "https://login.live.com/oauth20_authorize.srf?client_id=ebd055f3-20be-4095-9473-3bdd3efe8e11&scope=onedrive.readwrite&response_type=code&redirect_uri=https://login.live.com/oauth20_desktop.srf"

async function call() {
    try {
        const response = await axios.get(url)
        console.log(response)
    } catch (error) {
        console.log(error.status)
    }
}

call();

// const express = require('express');
// const fetch = require('node-fetch');
// const btoa = require('btoa');
// const { catchAsync } = require('../utils');

// const router = express.Router();

// function isEmptyObject(obj) {
//     return !Object.keys(obj).length;
// }

// router.get('/login', (req, res) => {
//     res.redirect(`https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=code&redirect_uri=${redirect_uri}`);
// });
