import { LucidePlusCircle } from "lucide-react";
import { useState } from "react";
import SearchUser from "../../utils/ui/searchBarUser";
import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "./services/services";
import Swal from 'sweetalert2'

interface Props {
  onClose: () => void;
}

type Mode = "none" | "all" | "individual" | "5-8" | "9-12" | "13-18";

const NotificationPanel = ({ onClose }: Props) => {
  const [createButton, setCreateButton] = useState(false);
  const [mode, setMode] = useState<Mode>("none");
  const [selectedUser, setSelectedUser] = useState<{ name: string; email: string } | null>(null);

  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    type: "",
    targetType: "",
    targetAgeGroup: "",
    recipientId: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setSelectedUser(null); // Reset selected user
  
    setNotificationData((prev) => ({
      ...prev,
      targetType:
        newMode === "all"
          ? "all"
          : newMode === "individual"
          ? "individual"
          : ["5-8", "9-12", "13-18"].includes(newMode)
          ? "age-group"
          : "",
      targetAgeGroup: ["5-8", "9-12", "13-18"].includes(newMode) ? newMode : "",
      recipientId: newMode === "individual" ? prev.recipientId : "",
    }));
  };
  

  const renderInputFields = () => (
    <div className="flex flex-col items-center justify-center mt-10 gap-y-6 w-full">
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        value={notificationData.title}
        onChange={handleFieldChange}
        className="border p-2  rounded-md w-4/6"
      />

      <textarea
        name="message"
        value={notificationData.message}
        onChange={handleFieldChange}
        className="bg-[#f3f3f3] p-2  h-40 rounded-md w-4/6"
        placeholder="Enter the message..."
      />

      <input
        type="text"
        name="type"
        placeholder="Enter Type (e.g. announcement)"
        value={notificationData.type}
        onChange={handleFieldChange}
        className="border p-2 rounded-md w-4/6"
      />

      <button 
        className="bg-emerald-600 px-6 py-2 rounded-xl text-white hover:bg-emerald-700 transition-all"
        onClick={handleSendNotification}
      >
        Send Notification
      </button>
    </div>
  );

  const handleSendNotification = () => {
    const { title, message, type, targetType, recipientId, targetAgeGroup } = notificationData;
  
    if (!title || !message || !type) {
      alert("Please fill in all the fields.");
      return;
    }
  
    if (mode === "individual" && !recipientId) {
      alert("Please select a user.");
      return;
    }
  
    if (["5-8", "9-12", "13-18"].includes(mode) && !targetAgeGroup) {
      alert("Please select a valid age group.");
      return;
    }
  
    console.log("Sending Notification:", notificationData);
    mutation.mutate(notificationData);
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});

  };

  const mutation = useMutation({
    mutationFn: sendNotification,
    onSuccess: (data) => {
      console.log("Notification sent successfully!", data);
      alert("Notification sent!");
      // Reset form or close panel if needed
      setCreateButton(false);
      setNotificationData({
        title: "",
        message: "",
        type: "",
        targetType: "",
        targetAgeGroup: "",
        recipientId: "",
      });
      setMode("none");
      setSelectedUser(null);
    },
    onError: (error: any) => {
      console.error("Failed to send notification", error);
      alert("Failed to send notification.");
    },
  });
  

  return (
    <div className="absolute top-0 left-0 h-[100vh] w-full md:w-2/5 bg-white shadow-lg z-50 transition-all duration-300 overflow-auto scrollbar-hide">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Send Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
          ✕
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 px-6 py-2 bg-[#008852] text-white rounded-xl hover:bg-[#029061db]"
            onClick={() => {
              setCreateButton(!createButton);
              setMode("none");
              setNotificationData({
                title: "",
                message: "",
                type: "",
                targetType: "",
                targetAgeGroup: "",
                recipientId: "",
              });
              setSelectedUser(null);
            }}
          >
            {createButton ? "Cancel" : <><LucidePlusCircle size={18} /> Create</>}
          </button>
        </div>

        {createButton && (
          <div className="mt-8 space-y-6">
            {/* Mode buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {["all", "individual", "5-8", "9-12", "13-18"].map((m) => (
                <button
                  key={m}
                  className={`px-4 py-2 rounded-xl capitalize ${
                    mode === m ? "bg-[#666] text-white" : "bg-[#e0e0e0] hover:bg-[#ccc]"
                  }`}
                  onClick={() => handleModeChange(m as Mode)}
                >
                  {m === "individual" ? "Individually" : m === "all" ? "All Users" : `Age ${m}`}
                </button>
              ))}
            </div>

            {/* Individual User Mode */}
            {mode === "individual" && (
              <div className="flex flex-col items-center gap-4 mt-6">
                <SearchUser
                  onSelect={(studentId: string, studentName?: string, studentEmail?: string) => {
                    setNotificationData((prev) => ({
                      ...prev,
                      recipientId: studentId,
                    }));
                    setSelectedUser({
                      name: studentName || "Selected Student",
                      email: studentEmail || "",
                    });
                  }}
                />
                {selectedUser && (
                  <p className="text-sm text-gray-600">
                    Sending to: <strong>{selectedUser.name}</strong> ({selectedUser.email})
                  </p>
                )}
                {notificationData.recipientId && renderInputFields()}
              </div>
            )}

            {/* Group Modes */}
            {(mode === "all" || ["5-8", "9-12", "13-18"].includes(mode)) && renderInputFields()}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
