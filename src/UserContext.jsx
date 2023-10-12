import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Fetch user data here if needed on app startup
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/profile");
      
        setUser(data);
      setReady(true);
      
    } catch (error) {
      // Handle errors here
      console.error("Error fetching user data:", error);
    }
  };
  
  
  return (
    <UserContext.Provider value={{ user,setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
