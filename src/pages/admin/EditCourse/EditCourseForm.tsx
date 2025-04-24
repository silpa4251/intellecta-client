import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchCourseDetails, Lesson } from "../services/services";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LessonForm from "./LessonForm";
import AllStudentsLoader from "../../../utils/ui/allStudentsLoader";

const EditCourseForm = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editcourse", courseId],
    queryFn: () => fetchCourseDetails(courseId || ""),
    enabled: !!courseId,
  });

  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState({
    _id: "",
    title: "",
    subject: "",
    description: "",
    gradeLevel: 0,
    difficultyLevel: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (data?.course) {
      setCourse({
        _id: data.course._id || "",
        title: data.course.title || "",
        subject: data.course.subject || "",
        description: data.course.description || "",
        gradeLevel: Number(data.course.gradeLevel) || 0,
        difficultyLevel: data.course.difficultyLevel || "",
        thumbnail: data.course.thumbnail || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.lessons) {
      setCourseLessons(data?.lessons);
    }
  }, [data]);

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse({ ...course, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLessonChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!courseLessons) {
      return null;
    }
    const updatedLessons = [...courseLessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [e.target.name]: e.target.value,
    };
    setCourseLessons(updatedLessons);
  };

  const [lessonVisibility, setLessonVisibility] = useState<boolean[]>(
    (data && data?.lessons?.map(() => true)) || []
  );

  const handleSave = async () => {
    try {
      await axios.put(`/api/course/editCourse/${course._id}`, course);
      if (courseLessons) {
        await Promise.all(
          courseLessons.map((lesson) =>
            axios.put(`/api/lesson/${lesson._id}`, lesson)
          )
        );
      }
      toast.success("Course and lessons updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    }
  };

  const addLesson = () => {
    setCourseLessons((prev) => [
      ...prev,
      {
        title: "",
        url: "",
        content: "",
        notes: "",
        order: prev.length + 1,
      },
    ]);
    setLessonVisibility((prev) => [...prev, true]);
  };
  

  const removeLesson = (index: number) => {
    if (!courseLessons?.length || !lessonVisibility) {
      return;
    }
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
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <AllStudentsLoader />
        </div>
      ) : (
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
            <LessonForm
              removeLesson={removeLesson}
              courseLessons={courseLessons}
              handleLessonChange={handleLessonChange}
              lessonVisibility={lessonVisibility}
              toggleLessonVisibility={toggleLessonVisibility}
              addLesson={addLesson}
            />

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
      )}
    </>
  );
};

export default EditCourseForm;
