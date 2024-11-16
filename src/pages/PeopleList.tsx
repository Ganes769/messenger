import React from "react";

interface Person {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface PeopleListProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onSelectPerson }) => {
  return (
    <div>
      {people.map((person) => (
        <div
          key={person.id}
          className="p-4 flex items-center border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelectPerson(person)}
        >
          <img
            src={`https://i.pravatar.cc/150?u=${person.id}`}
            alt={person.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <p className="font-medium">{person.name}</p>
            <p className="text-sm text-gray-500">{person.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
