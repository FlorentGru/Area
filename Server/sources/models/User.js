const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const mongoDBSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

mongoDBSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

mongoDBSchema.statics.fetchUser = async (email, password) => {
    const user = await User.findOne({ email} );
    if (!user || password !== user.password) {
        throw new Error({ error: 'Error : User not found' })
    }
    return user
};

const User = mongoose.model('User', mongoDBSchema);

module.exports = User;