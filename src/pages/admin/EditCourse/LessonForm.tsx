import { Lesson } from "../services/services";

interface LessonFormProps {
  addLesson: () => void;
  toggleLessonVisibility: (index: number) => void;
  lessonVisibility: boolean[];
  courseLessons: Lesson[];
  handleLessonChange: (index: number, e: any) => void;
  removeLesson: (index: number) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  addLesson,
  removeLesson,
  toggleLessonVisibility,
  lessonVisibility,
  courseLessons,
  handleLessonChange,
}) => {
  return (
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

      {courseLessons?.map((lesson: Lesson, index: number) => (
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
              {lessonVisibility && lessonVisibility[index] ? "Hide" : "Show"}{" "}
              Lesson
            </button>
          </div>

          {lessonVisibility && lessonVisibility[index] && (
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
              <div>
                <label className="block text-sm text-cyan-200 mb-1">
                  Lesson Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={lesson.order}
                  onChange={(e) => handleLessonChange(index, e)}
                  className="w-full rounded-xl bg-black/40 border border-cyan-500 px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Order"
                  min={1}
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
  );
};

export default LessonForm;
