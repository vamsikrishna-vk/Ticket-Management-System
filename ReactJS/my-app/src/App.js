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
//import ButtonAppBar from "./components/Appbar";
import ElevateAppBar from "./components/NewAppbar";


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="conversation" element={<Conversation />} />
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
