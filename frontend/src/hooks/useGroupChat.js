import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const useGroupChat = (groupId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${groupId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json',},
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [groupId]);

  const sendMessage = async (content) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${groupId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ content, userId: user._id }),
      });
      const data = await res.json();
      setMessages([...messages, data]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const likeMessage = async (messageId) => {
    try {
      await fetch(`/api/messages/${messageId}/like`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
      });
      setMessages(messages.map(msg =>
        msg._id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      ));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { messages, loading, sendMessage, likeMessage };
};

export default useGroupChat;
