const express = require('express');
var services = express();

const router = express.Router();

router.get('/services', async(req, res) => {
    try {
        res.status(200).send("services");
    } catch (error) {
        res.status(401).send(error);
    }
})

module.exports = router;