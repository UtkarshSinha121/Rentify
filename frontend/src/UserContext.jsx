import { useNavigate } from "react-router-dom";

const { useContext } = require("react");
const { useState } = require("react");
const { createContext } = require("react");

//initialize context
 const UserContext = createContext();

 //create a provider
 export const  UserProvider = ({children}) => 
   {
   const navigate = useNavigate();
    // get user data from session and convert to js using 'JSON.parse()'
   // and store in state
     const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
     );
     const [contact, setContact] = useState(false);
     const [loggedIn, setloggedIn] = useState(currentUser !==null ? true : false);
     
     const logout = () => {
        sessionStorage.removeItem('user');
        setcurrentUser(null);
        setloggedIn(false);
        setContact(false);
        navigate('/');
     }

    return <UserContext.Provider value={{ loggedIn, setloggedIn, logout, currentUser, setcurrentUser, contact, setContact}}>
           {children}
    </UserContext.Provider>
 }

 const useUserContext = () => useContext(UserContext);

 export default useUserContext;