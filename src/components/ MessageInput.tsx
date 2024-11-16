import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/ messagesSlice";

const MessageInput: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    if (text.trim()) {
      dispatch(
        addMessage({ id: Date.now(), name: text, email: "", isOutgoing: true })
      );
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-2 p-4">
      <input
        className="flex-grow border border-gray-300 rounded p-2"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
