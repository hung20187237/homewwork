import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './page/Login/Login';
import Register from './page/Register/Register';
import DashBoard from './page/DashBoard/DashBoard';
import Post from './page/Post/Post';
import CreatePost from './page/CreatePost/CreatePost';
import Analysis from './page/Analysis/Analysis';
import Settings from './page/Settings/Settings';
import { Context } from "./context/Context";
import './App.css';


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Settings/> : <Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
      </Routes>
    </Router>

  );
}

export default App;
