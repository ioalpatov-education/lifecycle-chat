import ChatMessage from "./ChatMessage";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ChatList = ({ messages }) => {
  const chatListRef = useRef(null);
  const lengthRef = useRef(0);

  useEffect(() => {
    const prevMessagesLength = lengthRef.current;
    
    if (prevMessagesLength !== messages.length) {
      lengthRef.current = messages.length;
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const messagesList = messages.map((message) => {
    return <ChatMessage key={message.id} message={message} />;
  });

  return (
    <div className="chat__list" ref={chatListRef}>
      {messagesList}
    </div>
  );
};

ChatList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default ChatList;
