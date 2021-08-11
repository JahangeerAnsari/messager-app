const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    sentAt: {
        type: Date,
        default: Date.now(),
    },



},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageSchema);