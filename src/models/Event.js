import mongoose from 'mongoose'

const { Schema } = mongoose

const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        default: false
    },
    games: [{
        type: String
    }]
})


export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
export default mongoose.models.Event || mongoose.model('Event', EventSchema);