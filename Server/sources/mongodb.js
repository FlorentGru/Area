const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

console.log(process.env.MONGODB_URL)

require('./models/User');
require('./models/AccessTokens');
require('./models/AreActions');