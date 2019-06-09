const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

userSchema.pre('save', beforeSave);

async function beforeSave(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_I);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

userSchema.methods.generateToken = async function(){
    const token = await jwt.sign(this._id.toHexString(), config.SECRET);
    this.token = token;
    await this.save();
    return this;
}

userSchema.statics.findByToken = function(token, cb){
    jwt.verify(token,config.SECRET, (err, decode)=>{
        this.findOne({"_id":decode,"token":token}, (err, user)=>{
            if(err) return cb(err);
            cb(null, user)
        });
    });
}

userSchema.methods.deleteToken = function(token, cb){
    this.token = undefined;
    this.save(cb(null, this));
    //NUINN EN
    // this.update({$unset:{token:1}}, (err, user) => {
    //     if(err) return cb(err);
    //     cb(null, user);
    // });
}

const User = mongoose.model('User', userSchema);

module.exports = { User }