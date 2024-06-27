import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustandGlobalState/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassname = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? 'bg-amber-400' : '';
	const time = (time1) => {
			return time1.toString.padStart(2,"0");
	};
	return (
		<div className>
			<div className={`chat ${chatClassname}`}>
				<div className='chat-image avatar'>
					<div className="w-10 rounded-full">
						<img alt='Tailwind CSS chat bubble component'  src={profilePic}/>
					</div>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{extractTime(message.createdAt)}</div>
		</div>
	)
};

export default Message;

export function extractTime(dateString) {
const date = new Date(dateString);
const hours = (date.getHours()).toString().padStart(2,"0");
const minutes = (date.getMinutes()).toString().padStart(2,"0");
return `${hours}:${minutes}`;
};
