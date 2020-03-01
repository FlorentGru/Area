const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

require('./mongodb');

const bodyParser = require('body-parser');

const authRouter = require('./routers/auth');
const oauthRouter = require('./oauthRoutes/oauth2');
const discordRouter = require('./oauthRoutes/discordAuth');
const dropboxRouter = require('./oauthRoutes/dropboxAuth');
const githubRouter = require('./oauthRoutes/githubAuth');
const slackRouter = require('./oauthRoutes/slackAuth');
const webhooksRouter = require('./routers/endpoints');
const areasRouter = require('./routers/areas');

/*const passport = require('passport');
const passportInit = require('./services/passportsInit');*/

const cors = require('cors');
const port = process.env.PORT;

const swagger = require('express-swagger-generator')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());

/*app.use(passport.initialize());
passportInit();*/

swagger(require('./swagger'));

app.use(authRouter);
app.use(oauthRouter);
app.use(discordRouter);
app.use(dropboxRouter);
app.use(slackRouter);
app.use(githubRouter);
app.use(webhooksRouter);
app.use(areasRouter);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'password'
}, app).listen(port);
