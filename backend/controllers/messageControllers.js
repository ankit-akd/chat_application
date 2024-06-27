import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

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