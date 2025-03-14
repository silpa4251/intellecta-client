import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import WelcomePage from './pages/WelcomePage';
import Assessment from './pages/Assessment';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/welcome' element={<WelcomePage/>} />
      <Route path='/assessment' element={<Assessment/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
