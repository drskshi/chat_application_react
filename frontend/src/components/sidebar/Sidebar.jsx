import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Conversations from "./Conversations";
import Logout from "./Logout";
import useConversataion from "../../store/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { setSelectedPerson } = useConversataion();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedPerson(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <div className="w-1/5 border-slate-500 p-4 flex flex-col min-w-52">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <FaSearch className="w-6 h-6 outline-none" />
        </button>
      </form>

      <div className="divider px-2"></div>
      <Conversations />
      <Logout />
    </div>
  );
};

export default Sidebar;
