const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    unitsCompleted: {
        type: [
            {
                unitId: {
                    type: Number
                },
                completedDate: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;