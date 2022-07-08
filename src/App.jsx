import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './page/Login/Login';
import Register from './page/register/Register';
import DashBoard from './page/DashBoard/DashBoard';
import Post from './page/Post/Post';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path='/post' element={<Post/>}/>
      </Routes>
    </Router>
  );
}

export default App;
