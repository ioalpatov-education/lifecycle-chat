import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import axios from "axios";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    updateChat();

    const updateIntervalId = setInterval(() => {
      updateChat();
    }, 2000);

    return () => {
      clearInterval(updateIntervalId);
    };
  }, []);

  const updateChat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/messages`
      );

      setMessages(data);
      setLoading(false);
      
    } catch (err) {
      throw new Error(err);
    }
  };

  const addMessage = async (content) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = nanoid();
      localStorage.setItem("userId", userId);
    }

    const messageToAdd = {
      id: nanoid(),
      userId,
      content,
    };

    console.log(messageToAdd);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URI}/messages`,
        messageToAdd
      );

      setLoading(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="chat">
      <h1>Anonimous Chat</h1>
      <ChatList messages={messages} />
      <ChatForm loading={loading} onAddMessage={addMessage} />
    </div>
  );
};

export default Chat;
