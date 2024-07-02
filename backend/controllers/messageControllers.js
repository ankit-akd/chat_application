import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    // console.log('message sent', req.params.id);
    // res.send('hello');
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]} 
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage);
        }

        //this won't run in parallel
        // await conversation.save();
        // await newMessage.save();

        //to run in parallel
        Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log('error in send message controller', error.message);
        res.status(500).json({error:'internal server error'});
    }

};

export const getMessage = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation =  await Conversation.findOne({
            participants:{$all: [senderId, userToChatId]},
        }).populate("messages");

        

        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log('error in get message controller', error.message);
        res.status(500).json({error:'internal server error'});
    }
}

export const sendGroupMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const newMessage = new Message({
            message,
            user: req.user.id,
            group: req.params.groupId
        });
        await newMessage.save();
        res.status(200).json({message: "message sent successfully"});

    } catch (error) {
        console.log('not able to send message',error.message);
        res.status(400).json({message: "not able to send message"});
    }
}

export const likeMessage = async (req,res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if(!message){
            console.log('message not found');
            return res.status(404).json({message: "message not found"});
        }
        message.likes += 1;
        await message.save();
        res.status(200).json({message: 'liked successfully', likes: message.likes});
    } catch (error) {
        console.log('error while performing like',error.message);
        res.status(400).json({message: "error while performing like"});
    }
}
