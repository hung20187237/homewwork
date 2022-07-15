
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
import { Context } from "./context/Context";
import { useRef, useContext } from "react";
import FBLogin from './Component/FBLogin/FBLogin';


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ?<Settings/> : <Login />}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </Router>

  );
}

export default App;
