import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    //   setTimeout(() => {
    //     lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }, 100);
    // }, [messages]);
    lastMessageRef.current?.scrollIntoView();
  });

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-center text-white">
            Send a message to start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
