import React from "react";

interface PersonProps {
  name: string;
  email: string;
  avatar: string; // Placeholder for user avatars.
}

const Person: React.FC<PersonProps> = ({ name, email, avatar }) => (
  <div className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
    <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
    <div>
      <p className="font-bold text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  </div>
);

export default Person;
