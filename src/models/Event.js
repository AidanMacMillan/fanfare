import mongoose from 'mongoose'

const { Schema } = mongoose

const EventSchema = new Schema({
    name: String,
    description: String,
    startTime: Data,
    endTime: Date,
    games: [{
        type: Schema.Types.ObjectId, ref: 'Game'
    }]
})

const GameSchema = new Schema({
    title: String,
    startTime: Date,
    game: Object,
})

mongoose.model('Game', gameSchema);
mongoose.model('Event', eventSchema);