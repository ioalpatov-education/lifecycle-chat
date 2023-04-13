import PropTypes from "prop-types";

const ChatMessage = ({ message }) => {
  const { userId, content } = message;

  const messageStyles = {
    alignSelf:
      userId === localStorage.getItem("userId") ? "flex-end" : "flex-start",
  };

  return (
    <div className="chat__message" style={messageStyles}>
      <p className="chat__text">{content}</p>
    </div>
  );
};

export default ChatMessage;
