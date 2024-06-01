
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import AddHouse from './component/AddHouse';
import ShowHouse from './component/ShowHouse';
import { UserProvider } from './UserContext';
import SellerHouse from './component/SellerHouse';
import Header from './component/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddHouse />} />
          <Route path="/show" element={<ShowHouse />} />
          <Route path="/seller" element={<SellerHouse />} />
        </Routes>
      </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
