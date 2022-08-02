import {
  Outlet,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Conversation from './pages/Conversation';
//import ButtonAppBar from "./components/Appbar";
import ElevateAppBar from "./components/NewAppbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


axios.defaults.withCredentials = 'true';
axios.defaults.crossDomain = 'true';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['withCredentials'] = 'true';
function App() {

  const {isLoggedIn, setIsLoggedIn} = useState(false)
  const [cookies] = useCookies(['XSRF-TOKEN']);
  console.log(document.cookie);
  const baseurl = "http://localhost:8080/"
  const isAdmin = false
  const navigate = useNavigate()


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="conversation/:id/:name/:status/:subject/:date" element={<Conversation />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <div>
        <ElevateAppBar />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
