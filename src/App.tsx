import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import WelcomePage from './pages/WelcomePage';
import Assessment from './pages/Assessment';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import CourseDetails from './pages/Courses/CourseDetails';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/welcome' element={<WelcomePage/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/courses/:category' element={<Courses/>} />
      <Route path='/courses/:category/:id' element={<CourseDetails/>} />
      <Route path='/assessment' element={<Assessment/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
