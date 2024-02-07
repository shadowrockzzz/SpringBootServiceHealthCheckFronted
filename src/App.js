import logo from './logo.svg';
import './App.css';
import { Home } from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard';
import { IndivServiceInfo } from './components/individualServiceInfo';
import InactiveServices from './components/inactiveServices';
import Notification from './components/notification';

function App() {
  return (
    <div>
      <Notification></Notification>
      <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/dashboard' exact element={<Dashboard/>} />
        <Route path = '/service/:serviceEntry/:serviceType' exact element ={<IndivServiceInfo/>}/>
        <Route path='/inactive' exact element={<InactiveServices/>} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
