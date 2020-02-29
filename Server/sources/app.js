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
const twitterRouter = require('./oauthRoutes/twitterAuth');
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
app.use(githubRouter);
app.use(twitterRouter);
app.use(webhooksRouter);
app.use(areasRouter);

var deadline = new Date("feb 28, 2020 18:21:00").getTime();
var now = new Date().getTime();
var t = deadline - now;
var days = Math.floor(t / (1000 * 60 * 60 * 24));
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((t % (1000 * 60)) / 1000);
console.log(days);
console.log(hours);
console.log(minutes);
console.log(seconds);


https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'password'
}, app).listen(port);
