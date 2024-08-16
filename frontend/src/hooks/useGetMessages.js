import React, { useEffect, useState } from "react";
import useConversataion from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedPerson } = useConversataion();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedPerson._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
        // console.log(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedPerson?._id) getMessages();
  }, [selectedPerson?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
