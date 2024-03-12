import mongoose from 'mongoose';
const { Schema } = mongoose;

const modelSchema = new Schema({
    username: {
        type: String,
        default: null
    },
    punchInTime: {
        type: Number,
        default: null
    },
    punchOutTime: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const PunchLogModel = mongoose.model('punch_log', modelSchema);
export default PunchLogModel;