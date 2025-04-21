import { LucidePlusCircle } from "lucide-react";
import { useState } from "react";
import SearchUser from "../../utils/ui/searchBarUser";

interface Props {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: Props) => {
  const [createButton, setCreateButton] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  // const [message, setMessage] = useState({});

  return (
    <div className="absolute top-0 h-full w-full md:w-2/5 bg-white shadow-lg z-50 transition-all duration-300">
      <div className="flex justify-between items-center p-4 ">
        <h2 className="text-xl font-semibold">Send Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="p-4">
        {/* Notifications List Here */}
        <div className="flex justify-center ">
          <button
            className="flex justify-between px-4 py-2 bg-[#008852] text-[#ffff] rounded-xl hover:bg-[#029061db]"
            onClick={() => setCreateButton(createButton ? false : true)}
          >
            {createButton ? (
              "Choose One"
            ) : (
              <span className="flex items-center">
                <LucidePlusCircle className="pr-1" /> Create
              </span>
            )}
          </button>
        </div>
        {createButton && (
          <div className="flex flex-wrap justify-center gap-y-8 mt-10">
            <div className="flex flex-wrap justify-between gap-x-5 ">
              <button
                className="bg-[#aeaeae] px-4 py-3 rounded-xl hover:bg-[#888] "
                onClick={() => setMessageBox(messageBox ? false : true)}
              >
                All Users
              </button>
              <button
                className="bg-[#aeaeae] px-4 py-2 rounded-xl hover:bg-[#888] "
                onClick={() => setShowSearchBox(showSearchBox ? false : true)}
              >
                Individually
              </button>
            </div>
            <div className="flex flex-wrap justify-between gap-x-5">
              <button
                className="bg-[#aeaeae] px-4 py-2 rounded-xl hover:bg-[#888] "
                onClick={() => setMessageBox(messageBox ? false : true)}
              >
                Category 5-8
              </button>
              <button
                className="bg-[#aeaeae] px-4 py-2 rounded-xl hover:bg-[#888] "
                onClick={() => setMessageBox(messageBox ? false : true)}
              >
                Category 9-12
              </button>
              <button
                className="bg-[#aeaeae] px-4 py-2 rounded-xl hover:bg-[#888] "
                onClick={() => setMessageBox(messageBox ? false : true)}
              >
                Category 13-18
              </button>
            </div>
          </div>
        )}
        {showSearchBox && (
          <div className="flex justify-center mt-20">
            <SearchUser />
          </div>
        )}

        {messageBox && (
          <div className="flex flex-col items-center justify-center mt-20 gap-y-10">
            <textarea
              name="message"
              id="message"
              className="bg-[#dcdcdc] p-2 border-none w-4/6 h-50"
              placeholder="Enter the message..."
            />
            <button className="bg-emerald-600 px-4 py-2 rounded-xl text-amber-50">
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
