import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import WelcomePage from './pages/WelcomePage';
import Assessment from './pages/Assessment';
import ProfilePage from './pages/Profile';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/welcome' element={<WelcomePage/>} />
      <Route path='/assessment' element={<Assessment/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
    </>
  )
}

export default App
