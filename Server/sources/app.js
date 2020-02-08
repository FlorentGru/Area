const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth');
const servicesRouter = require('./routers/services');

var cors = require('cors');
const port = process.env.PORT;
require('./mongodb');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

app.use(authRouter);
app.use(servicesRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});