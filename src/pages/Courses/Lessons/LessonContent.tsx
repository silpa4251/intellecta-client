import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpinningLoader from "../../../components/Loaders/SpinningLoader";
import { Lesson } from "../../../types";
import ReactPlayer from "react-player";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";
import { useState, useRef } from "react";
import screenfull from "screenfull";

type Params = {
  lessonId: string;
  lessonTitle: string;
};

const LessonContent = () => {
  const { lessonId = "" } = useParams<Params>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { courseTitle, courseId } = state || {};

  // State for custom controls
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef<ReactPlayer>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handlers for custom controls
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPlayed(value);
    if (playerRef.current) {
      playerRef.current.seekTo(value, "fraction");
    }
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number }) => {
    setPlayed(state.played);
    setPlayedSeconds(state.playedSeconds);
    setLoaded(state.loaded);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
  };

  const handleToggleMute = () => {
    setVolume(volume === 0 ? 0.8 : 0);
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(e.target.value);
    setPlaybackRate(value);
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled && wrapperRef.current) {
      screenfull.toggle(wrapperRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const fetchCourseWithLessons = async () => {
    if (!courseId) throw new Error("Course ID is missing");
    const response = await axios.get(`http://localhost:5005/api/courses/${courseId}`);
    console.log("Fetching lessons of course", response);
    return response.data.data;
  };

  const { data: courseData, isLoading: courseLoading, error: courseError } = useQuery<{
    course: { _id: string; title: string; description: string };
    lessons: Lesson[];
  }>({
    queryKey: ["courseWithLessons", courseId],
    queryFn: fetchCourseWithLessons,
    enabled: !!courseId,
  });

  const fetchLessonContent = async () => {
    const response = await axios.get(`http://localhost:5005/api/courses/lessons/${lessonId}`);
    console.log("Fetching lesson content", response.data.data);
    return response.data.data;
  };

  const { data: lessonData, isLoading, error } = useQuery<Lesson>({
    queryKey: ["lessonContent", lessonId],
    queryFn: fetchLessonContent,
    enabled: !!lessonId,
  });

  const isVideoResource = (resource: any) => {
    return (
      resource.includes(".mp4") ||
      resource.includes(".webm") ||
      resource.includes("youtu.be") ||
      resource.includes("youtube.com")
    );
  };

  const getVideoCount = (lesson: Lesson) => {
    let videoCount = 0;
    if (lesson.url && isVideoResource(lesson.url)) {
      videoCount += 1;
    }
    if (lesson.resources && lesson.resources.length > 0) {
      videoCount += lesson.resources.filter((resource) => isVideoResource(resource)).length;
    }
    return videoCount;
  };

  const [activeTab, setActiveTab] = useState<string | null>(null);

  if (isLoading || courseLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
        <p className="mt-14 text-xl font-semibold text-gray-800 text-center px-4">
          Loading Lesson Content. Please wait...!
        </p>
      </div>
    );
  }

  if (error || courseError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center">
          Error loading content: {(error || courseError)?.message}
        </p>
      </div>
    );
  }

  if (!lessonData || !courseData) {
    return null;
  }

  const lessons = courseData.lessons || [];
  const notesContent = lessonData.notes || "No materials available";
  const additionalResources = lessonData.resources || [];

  return (
    <>
      <NavbarWelcome />
      <div className="min-h-screen bg-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-8xl mx-auto flex gap-10">
          <div className="w-1/4 bg-white p-4 rounded-lg shadow-md space-y-4">
            <h3 className="text-lg font-semibold pb-2 border-b border-b-gray-300">
              Your Lessons
            </h3>
            {lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="space-y-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    lessonData._id === lesson._id
                      ? "bg-green-100 border-2 border-green-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    const sanitizedTitle = lesson.title
                      .replace(/[^a-zA-Z0-9\s-]/g, "")
                      .replace(/\s+/g, "-");
                    navigate(`/lesson/${sanitizedTitle}/${lesson._id}`, {
                      state: { courseTitle, courseId },
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">
                      {lesson.completed ? <IoCheckmarkCircleOutline /> : <FaPlay />}
                    </span>
                    <span className="text-sm">{lesson.title}</span>
                  </div>
                  <span className="text-xs text-gray-700">{getVideoCount(lesson)}</span>
                </div>
                {lessonIndex < lessons.length - 1 && (
                  <hr className="border-t border-gray-300" />
                )}
              </div>
            ))}
          </div>

          <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">{lessonData.title}</h1>

            {lessonData.content && (
              <div className="mb-6">
                <div className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                  {lessonData.content.split("\n").map((para, index) => (
                    <p key={index} className="text-white text-sm sm:text-base mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {lessonData.url && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Watch & Learn</h2>
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden" ref={wrapperRef}>
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <ReactPlayer
                      url={lessonData.url}
                      width="100%"
                      height="100%"
                      controls={false}
                      playing={playing}
                      volume={volume}
                      playbackRate={playbackRate}
                      ref={playerRef}
                      onProgress={handleProgress}
                      onDuration={handleDuration}
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      className="react-player"
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 0,
                            rel: 0,
                            modestbranding: 1,
                            iv_load_policy:3,
                            controls:0
                          },
                        },
                      }}
                      light={true}
                      playIcon={
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                          <FaPlay className="text-white text-5xl" />
                        </div>
                      }
                    />
                  </div>
                  <div className="bg-gray-800 p-2 flex flex-col space-y-2 text-white">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePlayPause}
                        className="p-2 hover:bg-gray-700 rounded-full"
                        aria-label={playing ? "Pause" : "Play"}
                      >
                        {playing ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
                      </button>
                      <div className="flex-1 flex items-center">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step="any"
                          value={played}
                          onChange={handleSeek}
                          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="text-sm">
                        {formatTime(playedSeconds)} / {formatTime(duration)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleToggleMute}
                          className="p-2 hover:bg-gray-700 rounded-full"
                          aria-label={volume === 0 ? "Unmute" : "Mute"}
                        >
                          {volume === 0 ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step="any"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <button
                        onClick={handleFullscreen}
                        className="p-2 hover:bg-gray-700 rounded-full"
                        aria-label="Toggle fullscreen"
                      >
                        <FaExpand className="text-lg" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span>Progress: {(played * 100).toFixed(1)}%</span>
                        {/* <span className="ml-4">Loaded: {(loaded * 100).toFixed(1)}%</span> */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Speed:</span>
                        <select
                          value={playbackRate}
                          onChange={handlePlaybackRateChange}
                          className="bg-gray-700 text-white rounded px-2 py-1"
                        >
                          <option value="0.5">0.5x</option>
                          <option value="1">1x</option>
                          <option value="1.5">1.5x</option>
                          <option value="2">2x</option>
                        </select>
                      </div>
                      <div>
                        <span>Remaining: {formatTime(duration - playedSeconds)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {lessonData.type === "quiz" && lessonData.url && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Quiz</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Link
                    to={`/course/quiz/${courseId}`}
                    className="text-blue-600 hover:underline text-sm block"
                  >
                    Take the Quiz
                  </Link>
                </div>
              </div>
            )}

            {lessonData.type === "exercise" && lessonData.url && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Exercise</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <a
                    href={lessonData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block"
                  >
                    View Exercise
                  </a>
                </div>
              </div>
            )}

            {!lessonData.url && !lessonData.content && !lessonData.resources && (
              <p className="text-gray-600 text-sm text-center">
                No content available for this lesson yet.
              </p>
            )}

            <div className="flex space-x-4 mb-6 mt-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "notes"
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 font-semibold"
                } hover:bg-blue-600 hover:text-white transition duration-300`}
                onClick={() => setActiveTab("notes")}
              >
                Notes 📒
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "resources"
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 font-semibold"
                } hover:bg-blue-600 hover:text-white transition duration-300`}
                onClick={() => setActiveTab("resources")}
              >
                Additional Resources 🔗
              </button>
            </div>

            {activeTab === "notes" && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Notes 📖</h2>
                {lessonData.notes ? (
                  <a
                    href={notesContent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-sm hover:underline block font-semibold"
                  >
                    View Study Material (PDF)
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm">No materials available.</p>
                )}
              </div>
            )}

            {activeTab === "resources" && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Additional Resources 🔗</h2>
                {additionalResources.length > 0 ? (
                  <div className="space-y-4">
                    {additionalResources.map((resource, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        {isVideoResource(resource) ? (
                          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                            <ReactPlayer
                              url={resource}
                              width="100%"
                              height="100%"
                              controls={true}
                              className="absolute top-0 left-0"
                              config={{
                                youtube: { playerVars: { showinfo: 1 } },
                              }}
                            />
                          </div>
                        ) : (
                          <a
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm block"
                          >
                            Resource {index + 1}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No resources available.</p>
                )}
              </div>
            )}

            <button
              onClick={() => navigate(`/course/${courseTitle}/${courseId}`)}
              className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full sm:w-auto mx-auto block"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonContent;