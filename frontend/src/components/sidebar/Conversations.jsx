import React from "react";
import Person from "./Person";
import useGetConversation from "../../hooks/useGetConversation";
import Bot from "./Bot";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Bot />
      {conversations.map((conversation, idx) => (
        <Person
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
