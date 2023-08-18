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
                type: Number,
                unique: true
            },
            completedData: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;