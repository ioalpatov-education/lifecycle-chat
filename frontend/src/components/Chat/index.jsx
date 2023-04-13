import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import axios from "axios";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const addMessage = async (message) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = nanoid();
      localStorage.setItem("userId", userId);
    }

    const messageToAdd = {
      id: nanoid(),
      userId,
      message,
    };

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
      <ChatForm loading={loading} onAddMessage={addMessage} />
    </div>
  );
};

export default Chat;
