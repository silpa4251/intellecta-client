import React, { useState, useRef } from "react";
import CourseSaveButton from "../../utils/ui/courseSaveButton";
import {
  ImageUpIcon,
  BookOpenTextIcon,
  LucideFlagTriangleRight,
  UploadCloudIcon,
  Library,
} from "lucide-react";
import axios from "axios";

type CourseDetails = {
  thumbnail: string; // Preview URL for the image
  title: string;
  subject: string;
  description: string;
  gradeLevel: string;
  difficultyLevel: string;
  file: File | null; // Allow `File` or `null`
};

const AddCourse = () => {
  const [courseId, setCourseId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    thumbnail: "",
    title: "Course Title",
    subject: "",
    description: "",
    gradeLevel: "",
    difficultyLevel: "",
    file: null,
  });

  const categories = ["Math", "Science", "English", "History", "Coding"];

  console.log('sdfghjhgfdfgh',courseDetails);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Store the raw file in state
    setCourseDetails({
      ...courseDetails,
      thumbnail: URL.createObjectURL(file), // For preview
      file, // Store the raw file
    });
  };

  const toLowercase = (value: string): string => {
    return value.toLowerCase();
  };

  const saveCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', courseDetails.title);
    formData.append('subject', toLowercase(courseDetails.subject));
    formData.append('description', courseDetails.description);
    formData.append('gradeLevel', courseDetails.gradeLevel);
    formData.append('difficultyLevel', toLowercase(courseDetails.difficultyLevel));

    if (courseDetails.file) {
      formData.append('image', courseDetails.file);
    }
    console.log('first',formData)
    const response = await axios.post("http://localhost:5005/api/courses", formData);
    console.log("response",response);
      setCourseId(response.data.data._id); // Store the courseId in state
      alert("Course saved successfully!");
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course. Please try again.");
    }
  };

  return (
    <div className="bg-[#DFF3F0] min-h-screen flex justify-center items-start py-12 px-4">
      <div className="bg-white w-full min-h-screen max-w-4xl rounded-2xl shadow-md">
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
                  src={courseDetails.thumbnail || "No Image Found"}
                  alt="Upload an Image"
                  className="w-full rounded-lg h-48 object-cover bg-[#8cf8d7]"
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
              <div className="mt-8 mb-4">
                <DetailItem
                  label="Course Title"
                  value={courseDetails.title}
                  onChange={(val) =>
                    setCourseDetails({ ...courseDetails, title: val })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1 font-medium">
                  Category
                </label>
                <select
                  value={courseDetails.subject}
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      subject: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md bg-white shadow-sm text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Input */}
              <div>
                <textarea
                  placeholder="Type description here ..."
                  className="w-full p-2 resize-none border-b-2 border-gray-500 outline-none text-sm h-20"
                  maxLength={400}
                  value={courseDetails.description}
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      description: e.target.value,
                    })
                  }
                />
                <div className="text-right text-sm text-gray-400">
                  {courseDetails.description.length}/400
                </div>
              </div>

              {/* Grade Level Dropdown */}
              <div className="flex gap-4 mb-3">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Grade Level
                  </label>
                  <select
                    value={courseDetails.gradeLevel}
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        gradeLevel: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md bg-white shadow-sm text-sm"
                  >
                    <option value="">Select Grade</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Level Select */}
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Difficulty Level
                  </label>
                  <select
                    value={courseDetails.difficultyLevel}
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        difficultyLevel: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md bg-white shadow-sm text-sm"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                  <button
                    onClick={saveCourse}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Create
                  </button>
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
                  {courseDetails.title}
                </h2>
                <p>{courseDetails.description}</p>
                <br />
                <div className="flex justify-around">
                  {/* <div className="bg-gray-300 rounded-3xl w-fit px-3">
                    Course
                  </div> */}
                  <div className="bg-gray-300 rounded-3xl w-fit px-3">
                    {courseDetails.subject || "Subject"}
                  </div>
                </div>
                <br />
                <br />
                <div className=" border-b-2 w-full" />
                <br />
                <div className="flex justify-around items-center">
                  {/* Stage */}
                  <div className="flex flex-col items-center space-y-2">
                    <button className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <LucideFlagTriangleRight className="text-9xl" />
                    </button>
                    <h1>Stage</h1>
                  </div>

                  {/* Upload */}
                  <div className="flex flex-col items-center space-y-2">
                    <button className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <UploadCloudIcon className="text-9xl" />
                    </button>
                    <h1>Upload</h1>
                  </div>

                  {/* Library */}
                  <div className="flex flex-col items-center space-y-2">
                    <button className="border-3 min-w-20 min-h-12 flex justify-center items-center rounded-xl">
                      <Library className="text-9xl" />
                    </button>
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
                      src={courseDetails.thumbnail}
                      alt="No Image found"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Section - 5/8 */}
                  <div className="flex-[5] text-gray-600  p-4">
                    <h1 className="text-xl font-semibold">
                      {courseDetails.title}
                    </h1>
                    <p className="mt-2">
                      Subject: {courseDetails.subject || "Add Category"}
                      <br />
                      Grade: {courseDetails.gradeLevel || "Add Grade"}
                      <br />
                      Level: {courseDetails.difficultyLevel || "Add Difficulty"}
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
      placeholder="Enter something..."
      onChange={(e) => onChange(e.target.value)}
      className={`pl-2 border-none bg-transparent text-right focus:outline-none focus:ring-0 ${
        value === "" ? "text-black" : "text-grey-400"
      }`}
    />
  </div>
);

export default AddCourse;

