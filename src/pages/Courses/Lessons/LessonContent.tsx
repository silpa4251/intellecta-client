import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpinningLoader from "../../../components/Loaders/SpinningLoader";
import { Lesson } from "../../../types";
import ReactPlayer from 'react-player';

type Params = {
  lessonId: string;
  lessonTitle: string;
};

const LessonContent = () => {
  const { lessonId = "" } = useParams<Params>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { courseTitle, courseId } = state || {};

  const fetchLessonContent = async () => {
    const response = await axios.get(`http://localhost:5005/api/courses/lessons/${lessonId}`);
    console.log("Fetching lesson content", response.data.data);
    return response.data.data;
  };

  const { 
    data: lessonData, 
    isLoading, 
    error 
  } = useQuery<Lesson>({
    queryKey: ['lessonContent', lessonId],
    queryFn: fetchLessonContent,
    enabled: !!lessonId,
  });

  const isVideoResource = (resource: string) => {
    return (
      resource.includes('.mp4') ||
      resource.includes('.webm') ||
      resource.includes('youtu.be') ||
      resource.includes('youtube.com')
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
        <p className="mt-14 text-xl font-semibold text-gray-800 text-center px-4">
          Loading Lesson Content. Please wait...!
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center">Error loading lesson content: {error.message}</p>
      </div>
    );
  }

  if (!lessonData) {
    return null;
  }

  return (
    <>
      <NavbarWelcome />
      <div className="min-h-screen bg-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
            {lessonData.title}
          </h1>
          
          {/* Lesson Metadata */}
          {/* <div className="mb-6 bg-green-400 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Type:</span> {lessonData.type}
            </p>
            {lessonData.duration && (
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold">Duration:</span> {lessonData.duration} minutes
              </p>
            )}
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Tags:</span> {lessonData.tags.join(", ")}
            </p>
          </div> */}

                    {/* {lessonData.type === "article" && lessonData.content && ( */}
            {/* <div className="mb-8 rounded-lg"> */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              {lessonData.content.split('\n').map((para, index) => (
              <p key={index} className="text-gray-800 text-sm sm:text-base mb-4">
                {para}
              </p>
              ))}
            </div>

            {/* </div> */}
          {/* )} */}

          {/* Main Content Section */}
          {lessonData.type === "video" && lessonData.url && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center md:text-left">
                Watch & Learn
              </h2>
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <ReactPlayer
                    url={lessonData.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    className="absolute top-0 left-0"
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {lessonData.type === "quiz" && lessonData.url && (
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">
                Quiz
              </h2>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <a 
                  href={lessonData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm sm:text-base block text-center md:text-left"
                >
                  Take the Quiz
                </a>
              </div>
            </div>
          )}

          {lessonData.type === "exercise" && lessonData.url && (
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">
                Exercise
              </h2>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <a 
                  href={lessonData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm sm:text-base block text-center md:text-left"
                >
                  View Exercise
                </a>
              </div>
            </div>
          )}

          {/* Resources Section */}
          {lessonData.resources && lessonData.resources.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center md:text-left">
                Explore More
              </h2>
              <div className="space-y-4">
                {lessonData.resources.map((resource, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    {isVideoResource(resource) ? (
                      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        <ReactPlayer
                          url={resource}
                          width="100%"
                          height="100%"
                          controls={true}
                          className="absolute top-0 left-0"
                          config={{
                            youtube: {
                              playerVars: { showinfo: 1 }
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <a 
                        href={resource} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm sm:text-base block text-center md:text-left"
                      >
                        Resource {index + 1}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If no specific content */}
          {!lessonData.url && !lessonData.content && !lessonData.resources && (
            <p className="text-gray-600 text-sm sm:text-base text-center">
              No content available for this lesson yet.
            </p>
          )}

          <button
            onClick={() => navigate(`/course/${courseTitle}/${courseId}`)}
            className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full sm:w-auto mx-auto block md:mx-0"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    </>
  );
};

export default LessonContent;