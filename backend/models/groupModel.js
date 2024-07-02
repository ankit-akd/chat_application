import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }]
});

const Group = mongoose.model('group', groupSchema);

export default Group;