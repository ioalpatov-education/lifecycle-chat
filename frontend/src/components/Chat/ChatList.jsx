import ChatMessage from "./ChatMessage";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const ChatList = ({ messages }) => {
  const [scrollBtnDisplay, setScrollBtnDisplay] = useState("none");
  const chatListRef = useRef(null);
  const lengthRef = useRef(0);

  const scrollBtnStyles = {
    display: scrollBtnDisplay,
  };

  useEffect(() => {
    const prevMessagesLength = lengthRef.current;

    if (prevMessagesLength !== messages.length) {
      lengthRef.current = messages.length;
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollDown = () => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };

  const handleChatScroll = () => {
    const chatScrollHeight = chatListRef.current.scrollHeight;
    const chatScrollTop = chatListRef.current.scrollTop;

    if (chatScrollHeight - 700 > chatScrollTop) {
      setScrollBtnDisplay("inline-flex");
    } else if (chatScrollTop === chatScrollHeight - 500) {
      setScrollBtnDisplay("none");
    }
  };

  const messagesList = messages.map((message) => {
    return <ChatMessage key={message.id} message={message} />;
  });

  return (
    <div className="shat__list-wrapper">
      <div className="chat__list" ref={chatListRef} onScroll={handleChatScroll}>
        {messagesList}
        <IconButton
          className="chat__btn chat__btn--scroll"
          style={scrollBtnStyles}
          color="secondary"
          onClick={scrollDown}
        >
          <ArrowForwardIos className="arrow-icon" />
        </IconButton>
      </div>
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
