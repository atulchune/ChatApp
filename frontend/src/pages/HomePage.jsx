import { useChatStore } from "../store/useChatStore";
import React from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-fit bg-base-200">
      <div className="flex items-center justify-center pt-8 pb-8 px-4 bg-[#5B6670]/10">
        <div className=" rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] bg-white">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
