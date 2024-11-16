import React from "react";
import { ArrowDown } from "lucide-react";
const ScrollToBottomButton: React.FC<{ scrollToBottom: () => void }> = ({
  scrollToBottom,
}) => (
  <button
    className="fixed bottom-16 right-10 bg-neutral-600 text-white p-2 rounded-full"
    onClick={scrollToBottom}
  >
    <ArrowDown />
  </button>
);

export default ScrollToBottomButton;
