import React from "react";
import useConversataion from "../../store/useConversation";

const Bot = () => {
  const { selectedPerson, setSelectedPerson } = useConversataion();

  const isSelected = selectedPerson === "bot";

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-500 rounded p-2 py-1 cursor-pointer my-2 
            ${isSelected ? "bg-sky-500 bg-opacity-30" : ""}
          `}
        onClick={() => {
          setSelectedPerson("bot");
          console.log(selectedPerson);
        }}
      >
        <div className={"avatar online"}>
          <div className="w-12 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/job/operator/male"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-bold text-gray-200">Chat Bot</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Bot;
