import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { getColor } from "./utils";

const ChatMessage = ({ message }) => {
  const { userId, content } = message;

  const color = getColor(userId);
  
  const messageStyles = {
    alignSelf: userId === Cookies.get("userId") ? "flex-end" : "flex-start",
    backgroundColor: color,
    filter: "brightness(90%)",
    color: color,
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
