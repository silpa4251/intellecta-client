import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import WelcomePage from "./pages/WelcomePage";
import Assessment from "./pages/Assessment";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import Lessons from "./pages/Courses/Lessons/Lessons";
import LessonDetails from "./pages/Courses/Lessons/LessonQuiz";
import MemoryGame from "./pages/Gamefied/Games/MemoryGame/MemoryGame";
import GameHome from "./pages/Gamefied/GamePages/GameHome";
import GameProfile from "./pages/Gamefied/GamePages/GameProfile";
import GamesLayout from "./pages/Gamefied/GameLayout";
import AllGames from "./pages/Gamefied/GamePages/AllGames";
import GameLeaderboard from "./pages/Gamefied/GamePages/GameLeaderboard";
import ChatBot from "./components/Chatbot/ChatBot";

function App() {
  return (
    <>
    <ChatBot />
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses/:category" element={<Courses />} />
        <Route path="/course/:courseTitle/:id" element={<Lessons />} />
        <Route path="/lesson/:lessonTitle/:lessonId"element={<LessonDetails />}/>
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/chatbot" element={<ChatBot />} /> */}
        <Route path="/games" element={<GamesLayout />}>
          <Route index element={<GameHome />} />
          <Route path="profile" element={<GameProfile />} />
          <Route path="allgames" element={<AllGames />} />
          <Route path="leaderboard" element={<GameLeaderboard />} />
          <Route path="memorygame" element={<MemoryGame />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
