import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Feed from './Components/Feed';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element="ye kkya hai" />
          <Route path="/" element={<Feed />} />
          <Route path='/reset' element={<ForgotPassword />} />
          <Route path='/profile/:id' element={<Profile />} />
          

        </Routes>
      </Router>
      {/* <Ioa/> */}
    </AuthProvider>
  );
}

export default App;
