import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
