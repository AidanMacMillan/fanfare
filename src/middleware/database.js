import mongoose from 'mongoose'
import { dbPass } from '../../config.js'

export default function database() {
    return async (req, res, next) => {
        if(mongoose.connection.readyState !== 1) {
            try {
                await mongoose.connect('mongodb+srv://admin:'+dbPass+'@cluster0.kaawa.mongodb.net/fanfare?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
                console.log('Connected to MongoDB')
            } catch(err) {
                console.log(err)
                console.error('Unable to connect to MongoDB')
            }
        }
        next();
    }
}