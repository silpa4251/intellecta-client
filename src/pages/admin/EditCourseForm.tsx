import { useState } from "react";
import axios from "axios";

const EditCourseForm = () => {
  const [course, setCourse] = useState({
    _id: "680639085d2f3d93096cc5ad",
    title: "read",
    subject: "english",
    description: "hello",
    gradeLevel: 3,
    difficultyLevel: "beginner",
    thumbnail: "",
  });

  const [courseLessons, setCourseLessons] = useState([
    {
      _id: "680639405d2f3d93096cc5b0",
      course: "680639085d2f3d93096cc5ad",
      title: "write",
      type: "video",
      tags: [],
      url: "https://intellcta-course-content.s3.eu-north-1.amazonaws.com/videos/1745238278481.mp4",
      content: "hello",
      resources: [
        {
          type: "pdf",
          link: "https://intellcta-course-content.s3.eu-north-1.amazonaws.com/resources/notes1.pdf",
          name: "Lesson Notes",
        },
      ],
      notes: "hai",
      order: 1,
    },
    {
      _id: "680639405d2f3d93096cc5b1",
      course: "680639085d2f3d93096cc5ad",
      title: "conversation basics",
      type: "video",
      tags: ["speaking", "practice"],
      url: "https://intellcta-course-content.s3.eu-north-1.amazonaws.com/videos/1745238278499.mp4",
      content: "Learn how to greet and introduce yourself.",
      resources: [
        {
          type: "pdf",
          link: "https://intellcta-course-content.s3.eu-north-1.amazonaws.com/resources/conversation_notes.pdf",
          name: "Conversation Notes",
        },
      ],
      notes: "Focus on pronunciation",
      order: 2,
    },
  ]);

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse({ ...course, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file); // Convert image to base64 string for preview
    }
  };
  const handleLessonChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedLessons = [...courseLessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [e.target.name]: e.target.value,
    };
    setCourseLessons(updatedLessons);
  };

  const [lessonVisibility, setLessonVisibility] = useState(
    courseLessons.map(() => true)
  );

  const handleSave = async () => {
    try {
      await axios.put(`/api/course/${course._id}`, course);
      await Promise.all(
        courseLessons.map((lesson) =>
          axios.put(`/api/lesson/${lesson._id}`, lesson)
        )
      );
      alert("Course and lessons updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    }
  };

  const addLesson = () => {
    const newLesson = { title: "", url: "", content: "", notes: "" };

    setCourseLessons([...courseLessons, newLesson]);

    setLessonVisibility([...lessonVisibility.map(() => false), true]);
  };

  const removeLesson = (index: number) => {
    const updatedLessons = courseLessons.filter((_, i) => i !== index);
    const updatedVisibility = lessonVisibility.filter((_, i) => i !== index);
    setCourseLessons(updatedLessons);
    setLessonVisibility(updatedVisibility);
  };

  const toggleLessonVisibility = (index: number) => {
    const updated = [...lessonVisibility];
    updated[index] = !updated[index];
    setLessonVisibility(updated);
  };

  return (
    <div className="relative flex items-ceter justify-center min-h-screen  p-4 mb-10">
      <div className="w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-3xl border border-gray-700 bg-white/10 backdrop-blur-xl p-8 shadow-2xl scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <h2 className="text-4xl font-bold text-center text-cyan-900 mb-8 uppercase tracking-widest">
          Edit Course
        </h2>

        {/* Course Info */}
        <div className="space-y-3 border border-cyan-500 bg-cyan-700 rounded-xl p-6 mb-6 ">
          <div>
            <label className="block text-sm font-semibold text-cyan-200 mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleCourseChange}
              placeholder="Enter course title"
              className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-200 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={course.subject}
              onChange={handleCourseChange}
              placeholder="Enter subject"
              className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-200 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={course.description}
              onChange={handleCourseChange}
              placeholder="Enter description"
              className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-cyan-200 mb-1">
                Grade Level
              </label>
              <input
                type="number"
                name="gradeLevel"
                value={course.gradeLevel}
                onChange={handleCourseChange}
                className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-200 mb-1">
                Difficulty
              </label>
              <select
                name="difficultyLevel"
                value={course.difficultyLevel}
                onChange={handleCourseChange}
                className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-cyan-200 mb-1">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white"
              />
              {course.thumbnail && (
                <div className="mt-4">
                  <h4 className="text-cyan-200 font-medium">
                    Thumbnail Preview
                  </h4>
                  <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    className="w-32 h-32 object-cover rounded-xl border border-cyan-500 mt-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold ">Lessons</h3>
            <button
              onClick={addLesson}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-lg"
            >
              + Add Lesson
            </button>
          </div>

          {courseLessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="border border-cyan-500 bg-cyan-700 rounded-xl p-6 mb-6 "
            >
              <div className="flex justify-between items-center mb-4 ">
                <h4 className="text-xl font-semibold text-white">
                  Lesson {index + 1}
                </h4>
                <button
                  onClick={() => toggleLessonVisibility(index)}
                  className="text-sm text-cyan-400 hover:underline"
                >
                  {lessonVisibility[index] ? "Hide" : "Show"} Lesson
                </button>
              </div>

              {lessonVisibility[index] && (
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-cyan-200 mb-1">
                      Lesson Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white placeholder-gray-400"
                      placeholder="Lesson title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-cyan-200 mb-1">
                      Video URL
                    </label>
                    <input
                      type="text"
                      name="url"
                      value={lesson.url}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white placeholder-gray-400"
                      placeholder="Video URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-cyan-200 mb-1">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white h-24 placeholder-gray-400"
                      placeholder="Lesson content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-cyan-200 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={lesson.notes}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white placeholder-gray-400"
                      placeholder="Notes"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => removeLesson(index)}
                className="text-red-500 text-sm hover:underline mt-4 block"
              >
                Remove Lesson
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSave}
            className="mt-5  bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseForm;
