const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    local: {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    avatar: {
        type: String,
        default: '/images/avatars/default-profile.png'
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    }
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12)
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;