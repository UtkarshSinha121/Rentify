
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
import EditHouse from './component/EditHouse';
import { Toaster } from 'react-hot-toast';
import UserAuth from './UserAuth';
import Error from './component/Error';
import ViewDetails from './component/ViewDetails';

function App() {
  return (
    <div>
       <Toaster position='top-center'/>
      <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<UserAuth><AddHouse /></UserAuth>} />
          <Route path="/show" element={<ShowHouse />} />
          <Route path="/seller" element={<UserAuth><SellerHouse /></UserAuth>} />
          <Route path="/edit/:id" element={<UserAuth><EditHouse /></UserAuth>} />
          <Route path="/view/:id" element={<UserAuth><ViewDetails /></UserAuth>} />
          <Route path="*" element={<Error />} />

        </Routes>
      </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
