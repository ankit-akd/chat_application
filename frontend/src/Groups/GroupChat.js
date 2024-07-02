import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGroupChat from '../hooks/useGroupChat';

const GroupChat = () => {
  const { id } = useParams();
  const { messages, loading, sendMessage, likeMessage } = useGroupChat(id);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <h2 className='text-3xl font-semibold text-center text-gray-300'>
        Group Chat
      </h2>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {messages.map(message => (
              <div key={message._id} className='my-2'>
                <p>{message.content} - {message.user.username}</p>
                <button
                  className='btn btn-sm btn-outline'
                  onClick={() => likeMessage(message._id)}
                >
                  Like ({message.likes})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className='w-full p-2'>
        <input
          type="text"
          className='input input-bordered w-full'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          type="submit"
          className='btn btn-primary btn-block mt-2'
          disabled={loading}
        >
          {loading ? <span className='loading loading-spinner'></span> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
