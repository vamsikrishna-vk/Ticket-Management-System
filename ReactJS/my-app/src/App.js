import {
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Conversation from './pages/Conversation';
import ElevateAppBar from "./components/NewAppbar";
import axios from "axios";


axios.defaults.withCredentials = 'true';
axios.defaults.crossDomain = 'true';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['withCredentials'] = 'true';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="conversation/:id/:name/:status/:subject/:date/:role" element={<Conversation />} />
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
