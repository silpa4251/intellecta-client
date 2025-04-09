import React, { useState, useRef } from "react";
import CourseSaveButton from "../../utils/ui/courseSaveButton";
import {
  ImageUpIcon,
  BookOpenTextIcon,
  Clock3Icon,
  Languages,
  LucideFlagTriangleRight,
  UploadCloudIcon,
  Library,
} from "lucide-react";

const AddCourse = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [courseDetails, setCourseDetails] = useState({
    thumbNailImage: "",
    heading: "What is the learning path",
    category: "Empty",
    language: "Empty",
    duration: "Empty",
    description: "",
  });
  console.log(courseDetails);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseDetails({
        ...courseDetails,
        thumbNailImage: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#DFF3F0] min-h-screen flex justify-center items-start py-12 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-md">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          <Tab
            label="Learning Path Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <Tab
            label="Add Content"
            active={activeTab === "add"}
            onClick={() => setActiveTab("add")}
          />
          <Tab
            label="Upload Course"
            active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          />
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6 lg:px-32 h-[600px] flex flex-col justify-start">
          {activeTab === "overview" && (
            <>
              {/* Banner Image */}
              <div className="relative mb-6">
                <img
                  src={courseDetails.thumbNailImage || "No Image Found"}
                  alt="Upload an Image"
                  className="w-full rounded-lg h-52 object-cover bg-[#8cf8d7]"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center absolute bottom-4 right-4 bg-white text-[#5e5d5d] px-3 py-2 rounded-xl shadow-md"
                >
                  <ImageUpIcon className="w-4 h-4 mr-2" />
                  <h1 className="text-sm">Upload Thumbnail</h1>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleThumbnailChange}
                  className="hidden"
                />

                <div className="absolute -bottom-6 left-6 bg-teal-500 text-white p-4 rounded-2xl border-4">
                  <BookOpenTextIcon className="text-6xl" />
                </div>
              </div>

              {/* Course Title */}
              <div className="flex items-center gap-3 mt-8 mb-4">
                <input
                  type="text"
                  value={courseDetails.heading}
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      heading: e.target.value,
                    })
                  }
                  className={`text-2xl font-semibold leading-snug w-full bg-transparent border-none focus:outline-none focus:ring-0 ${
                    courseDetails.heading === "What is the learning path"
                      ? "text-gray-400"
                      : "text-black"
                  }`}
                />
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <DetailItem
                  label="Category"
                  value={courseDetails.category}
                  onChange={(val) =>
                    setCourseDetails({ ...courseDetails, category: val })
                  }
                />
                <DetailItem
                  label="Estimate Duration"
                  value={courseDetails.duration}
                  onChange={(val) =>
                    setCourseDetails({ ...courseDetails, duration: val })
                  }
                />
                <DetailItem
                  label="Language"
                  value={courseDetails.language}
                  onChange={(val) =>
                    setCourseDetails({ ...courseDetails, language: val })
                  }
                />
              </div>

              {/* Description Input */}
              <div>
                <textarea
                  placeholder="Type description here ..."
                  className="w-full p-3 resize-none border-b-2 border-gray-500 outline-none text-sm h-20"
                  maxLength={400}
                  value={courseDetails.description}
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      description: e.target.value,
                    })
                  }
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {courseDetails.description.length}/400
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Let your learner know a little about your learning path
                </p>
              </div>
            </>
          )}

          {activeTab === "add" && (
            <div className="flex-grow flex items-center justify-center text-gray-400">
              <div>
                <div className=" bg-teal-500 text-white p-4 rounded-2xl w-14">
                  <BookOpenTextIcon />
                </div>
                <h2 className="text-3xl font-semibold leading-snug text-gray-700">
                  General Knowledge about – <br />
                  the world
                </h2>
                <p>
                  The vibrant colors of the sunset painted the sky with hues of{" "}
                  <br />
                  orange and pink, casting long shadows across the beach. Gentle{" "}
                  <br />
                  waves lapped at the shore, creating a soothing rhythm as the{" "}
                  <br />
                  day faded into twilight. A flock of birds flew overhead
                </p>
                <br />
                <div className="flex justify-around">
                  <div className="bg-gray-300 rounded-3xl w-fit px-3">
                    Course
                  </div>
                  <div className="bg-gray-300 rounded-3xl w-fit px-3">
                    Catagory
                  </div>
                  <div className=" flex w-fit  text-gray-600">
                    <Clock3Icon className="mr-2" />1 Weak
                  </div>
                  <div className=" flex w-fit  text-gray-600 px-3">
                    <Languages className="mr-2" />
                    Language
                  </div>
                </div>
                <br />
                <br />
                <div className=" border-b-2 w-full" />
                <br />
                <div className="flex justify-around items-center">
                  {/* Stage */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <LucideFlagTriangleRight className="text-9xl" />
                    </div>
                    <h1>Stage</h1>
                  </div>

                  {/* Upload */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <UploadCloudIcon className="text-9xl" />
                    </div>
                    <h1>Upload</h1>
                  </div>

                  {/* Library */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <Library className="text-9xl" />
                    </div>
                    <h1>Library</h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-lg">
              <div className="flex flex-col items-center justify-between">
                <h1>Preview</h1>
                <br />
                <div className="flex flex-col bg-[#ececec] rounded-2xl w-[560px] h-[400px] overflow-hidden">
                  {/* Image Section - 3/8 */}
                  <div className="flex-[3] w-full overflow-hidden">
                    <img
                      src={courseDetails.thumbNailImage}
                      alt="No Image found"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Section - 5/8 */}
                  <div className="flex-[5] text-gray-600  p-4">
                    <h1 className="text-xl font-semibold">
                      {courseDetails.heading}
                    </h1>
                    <p className="mt-2">
                      Category: {courseDetails.category || "Add Category"}
                      <br />
                      Language: {courseDetails.language || "Add Language"}
                      <br />
                      Duration: {courseDetails.duration || "Add Duration"}
                    </p>
                  </div>
                </div>

                <br />
                <div>
                  <CourseSaveButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tab Component
const Tab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 text-center py-4 font-medium text-sm sm:text-base border-b-2 transition-colors duration-200 ${
      active
        ? "border-green-500 text-black"
        : "border-transparent text-gray-500 hover:text-black"
    }`}
  >
    {label}
  </button>
);

// DetailItem Component
const DetailItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex items-center justify-between text-gray-700">
    <div className="flex items-center gap-2">
      <span className="text-xl">🔘</span>
      <span>{label}</span>
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`pl-2 border-none bg-transparent text-right focus:outline-none focus:ring-0 ${
        value === "" ? "text-black" : "text-grey-400"
      }`}
    />
  </div>
);

export default AddCourse;
