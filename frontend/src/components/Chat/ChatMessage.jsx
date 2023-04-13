import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ChatMessage = ({ message }) => {
  const { userId, content } = message;

  const messageStyles = {
    alignSelf: userId === Cookies.get("userId") ? "flex-end" : "flex-start",
  };

  return (
    <div className="chat__message" style={messageStyles}>
      <p className="chat__text">{content}</p>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
