import mongoose, { Mongoose } from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    message:{
        type: String,
        required: true,
        trim: true,
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    likes:{
        type:Number,
        default:0
    }
},{timestamps:true}); //createdAt, updatedAt

const Message = mongoose.model("Message", messageSchema);

export default Message;