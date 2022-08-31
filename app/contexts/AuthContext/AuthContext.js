import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
});

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
