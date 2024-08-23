import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import NoteState from './context/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
import Start from './component/Start';
import Alert from './component/Alert';

function App() {
  
  return (
    <> 
   <NoteState>
    <Router>
      <Navbar/>
      <Routes>
            <Route exact path="/" element={<Start/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
