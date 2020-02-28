const axios = require('axios').default

export default async function GitHubCall(token) {
    console.log(token)
    try {
        const response = await axios({
            method: "get",
            url: "https://localhost8081/oauth2/github",
            headers: {'Authorization': `Bearer ${token}`},
        });
        console.log(response.data)
        alert("success")
    } catch(error) {
        console.log(error)
        alert("error")
    }
}


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2NzBkN2RhNjZmNDBiNjhhNWRlMDEiLCJpYXQiOjE1ODI4MzU3NjZ9.Ifn7QlCXFWz0DlSKZ2iYKry_Hckne2RxkTHPBSD3F1s"