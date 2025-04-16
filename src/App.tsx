import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import WelcomePage from "./pages/WelcomePage";
import Assessment from "./pages/Assessment";
import AssessmentResults from "./pages/AssessmentResults";
import Home from "./pages/Home/Home";
import Programs from "./pages/Home/Programs";
import ProfilePage from "./pages/Profile";
import Courses from "./pages/Courses/Courses";
import Lessons from "./pages/Courses/Lessons/Lessons";
// import LessonDetails from "./pages/Courses/Lessons/LessonQuiz";
import GameProfile from "./pages/Gamefied/GamePages/GameProfile";
import AllGames from "./pages/Gamefied/GamePages/AllGames";
import GameLeaderboard from "./pages/Gamefied/GamePages/GameLeaderboard";
import MemoryGame from "./pages/Gamefied/Games/MemoryGame/MemoryGame";
import TicTacToe from "./pages/Gamefied/Games/Tictactoe/TicTacToe";
import GameHome from "./pages/Gamefied/GamePages/GameHome";
import GamesLayout from "./pages/Gamefied/GameLayout";
import ChatBot from "./components/Chatbot/ChatBot";
import GeographyQuiz from "./pages/Gamefied/Games/GeographyQuiz/GeographyQuiz";
import WordBuilder from "./pages/Gamefied/Games/WordBuilder/WordBuilder";
import UserDashLayout from "./pages/userDash.tsx/UserDashLayout";


import AdminLayout from './pages/admin/AdminLayout';
import Admindashboard from './pages/admin/Admindashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminCoursesPage from './pages/admin/AdminCourses';
import AddCourse from './pages/admin/AddCourse';

import LessonContent from './pages/Courses/Lessons/LessonContent';
import AdminNotifications from "./pages/admin/AdminNotifications";

function App() {
  return (
    <>
      <ChatBot />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Programs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses/:category" element={<Courses />} />
        <Route path="/course/:courseTitle/:id" element={<Lessons />} />
        <Route path="/lesson/:lessonTitle/:lessonId" element={<LessonContent />} />
        {/* <Route
          path="/lesson/:lessonTitle/:lessonId"
          element={<LessonDetails />}
        /> */}
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment-results" element={<AssessmentResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<GamesLayout />}>
          <Route index element={<GameHome />} />
          <Route path="myprofile" element={<GameProfile />} />
          <Route path="allgames" element={<AllGames />} />
          <Route path="leaderboard" element={<GameLeaderboard />} />
          <Route path="memory_game" element={<MemoryGame />} />
          <Route path="word_builder" element={<WordBuilder />} />
          <Route path="tic_tac_toe" element={<TicTacToe />} />
          <Route path="geography_quiz" element={<GeographyQuiz />} />
        </Route>
        {/* user dash  */}
        <Route path="/userdash" element={<UserDashLayout />}></Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<Admindashboard/>}/>
          <Route path="students" element={<AdminStudents/>}/>
          <Route path="courses" element={<AdminCoursesPage/>}/>
          <Route path="addCourse" element={<AddCourse/>}/>
          <Route path="notification" element={<AdminNotifications/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
