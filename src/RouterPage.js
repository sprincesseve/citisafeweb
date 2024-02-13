import Dashboard from './pages/Dashboard/Dashboard';
import Violation from './pages/Violation/Violation';
import Profile from './pages/Profile/Profile';
import UserControl from './pages/UserControl/UserControl';
import Navbar from './Navbar';
import { Route, Routes } from "react-router-dom"
import Driver from './pages/driver/driver';

function RouterPage(props) {
    return (
        <div>
        <Navbar></Navbar>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/violation" element={<Violation />} />
            <Route path="/user" element={<UserControl />} />
            <Route path="/profile" element={<Profile />} />            
            <Route path="/driver" element={<Driver />} />            
          </Routes>
      </div>
    );
}

export default RouterPage;