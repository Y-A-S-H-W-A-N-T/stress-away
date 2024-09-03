import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Schedule from './pages/schedule';
import Home from './pages/home';
import Upcoming from './pages/upcoming';
import Login from './pages/login';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='/home' Component={Home}/>
          <Route path='/schedule' Component={Schedule}/>
          <Route path='/upcoming' Component={Upcoming}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
