import React from "react";

interface MessageProps {
  name: string;
  email: string;
  isOutgoing: boolean;
}

const Message: React.FC<MessageProps> = ({ name, email, isOutgoing }) => (
  <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`p-4 rounded-lg ${
        isOutgoing ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      <p className="font-bold">{name}</p>
      <p>{email}</p>
    </div>
  </div>
);

export default Message;
