import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register'
import Login from './components/login';
import ForgetPasswordEmailPage from './components/forgetPassword';
import ForgetPasswordOTPPage from './components/enterOtp';
import HomePage from './components/home';

function App() {
 
 
  return (
    <>
      <Router>
        <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forget-password/email" element={<ForgetPasswordEmailPage/>}/>
        <Route path="/forget-password/otp" element={<ForgetPasswordOTPPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </Router>
    </>
  )
}
 
export default App
 