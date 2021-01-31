import mongoose from 'mongoose'
import 'mongoose-type-email'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../../config.js'

const { Schema } = mongoose

var UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isProducer: Boolean,
    events: [{
        type: Schema.Types.ObjectId, ref: 'Event'
    }]
}, {timestamps: true});

UserSchema.pre('save', function(next) {
    var user = this

    if(!user.isModified('password')) {
        return next()
    }

    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err)
        }

        user.password = hash
        next()
    })
})

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.hash)
}

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    }
}

export default mongoose.models.User || mongoose.model('User', UserSchema);