import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/ messagesSlice";
import { RootState } from "../store/  store";
import Message from "../components/Message";
import MessageInput from "../components/ MessageInput";
import PeopleList from "./PeopleList";
import ScrollToBottomButton from "../components/  ScrollToBottomButton";

const Messenger: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, page_size, hasMore, loading } = useSelector(
    (state: RootState) => state.messages
  );
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const peopleListRef = useRef<HTMLDivElement>(null);
  const messengerRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  useEffect(() => {
    if (messages.length === 0 && !loading) {
      console.log("Initial fetch triggered");
      dispatch(fetchMessages(page_size)); // Fetch initial data
    }
  }, [dispatch, page_size, messages.length, loading]);

  const handlePersonSelect = (person: { name: string }) => {
    setSelectedPerson(person.name);
  };

  // Handle scroll in People List to trigger more data
  const handlePeopleListScroll = () => {
    const container = peopleListRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Trigger data fetch when scrolling near the bottom
      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        hasMore &&
        !loading
      ) {
        console.log("Fetching more messages for People List");
        dispatch(fetchMessages(page_size)); // Increase page size to load more
      }
    }
  };

  // Handle scroll in Messenger section
  const handleMessengerScroll = () => {
    const container = messengerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10);

      // Trigger fetch more when user is near the bottom
      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        hasMore &&
        !loading
      ) {
        console.log("Fetching more messages for Messenger");
        dispatch(fetchMessages(page_size + 10)); // Increase page size for fetching
      }
    }
  };

  // Scroll to bottom functionality
  const scrollToBottom = () => {
    const container = messengerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  console.log("cc", messages);

  return (
    <div className="h-screen flex">
      {/* People List Section */}
      <div
        ref={peopleListRef}
        onScroll={handlePeopleListScroll}
        className="w-1/4 bg-gray-100 overflow-y-auto"
      >
        <h1 className="text-xl font-bold p-4 border-b border-gray-300">
          People List
        </h1>
        <PeopleList people={messages} onSelectPerson={handlePersonSelect} />
        {loading && (
          <div className="p-4 text-center flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-blue-500 mt-2">Loading...</p>
          </div>
        )}
      </div>

      {/* Messenger Section */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div
          ref={messengerRef}
          className="flex-grow overflow-y-scroll p-4"
          onScroll={handleMessengerScroll}
        >
          <h2 className="text-lg font-bold mb-4">
            {selectedPerson
              ? `Chat with ${selectedPerson}`
              : "Select a person to chat"}
          </h2>
          {messages.map((msg, index) => (
            <Message
              key={msg.email}
              name={msg.name}
              email={msg.email}
              isOutgoing={index % 2 === 1}
            />
          ))}
        </div>
        <MessageInput />
      </div>

      {showScrollButton && (
        <ScrollToBottomButton scrollToBottom={scrollToBottom} />
      )}
    </div>
  );
};

export default Messenger;
