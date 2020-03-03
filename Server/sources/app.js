const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

require('./mongodb');

const authRouter = require('./routers/auth');
const spotifyRouter = require('./oauthRoutes/spotifyAuth');
const discordRouter = require('./routers/discordAuth');
const dropboxRouter = require('./routers/dropboxAuth');
const githubRouter = require('./routers/githubAuth');
const slackRouter = require('./routers/slackAuth');
const webhooksRouter = require('./routers/endpoints');
const areasRouter = require('./routers/areas');

const cors = require('cors');
const port = process.env.PORT;

const swagger = require('express-swagger-generator')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());

swagger(require('./swagger'));

app.use(authRouter);
app.use(discordRouter);
app.use(dropboxRouter);
app.use(slackRouter);
app.use(githubRouter);
app.use(spotifyRouter);
app.use(webhooksRouter);
app.use(areasRouter);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'password'
}, app).listen(port);
