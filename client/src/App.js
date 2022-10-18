import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/noteState';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [alert,setAlert] = useState(null);

  const showAlert = (title,message,icon,color)=>{
    setAlert({
      title: title,       //success,Failed
      msg: message,
      icon: icon,          //fa-check-square,fa-circle-xmark
      color: color         //green,red
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}>
            </Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />}>
            </Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
