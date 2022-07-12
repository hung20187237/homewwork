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
import CreatePost from './page/CreatePost/CreatePost';
import Analysis from './page/Analysis/Analysis';
import Settings from './page/Settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path='/post' element={<Post/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
