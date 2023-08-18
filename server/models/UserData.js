const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    unitsCompleted: [
        {
            unitId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Unit'
            },
            completedData: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;