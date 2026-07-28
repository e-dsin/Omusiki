import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, _password) => {
    // Le préfixe _ indique que password est intentionnellement non utilisé
    // pour cette implémentation de démonstration
    setIsLoading(true);

    // Simulation d'une connexion
    setTimeout(() => {
      setUser({
        name: 'Utilisateur Demo',
        email: email,
        subscription: 'Premium',
      });
      setIsLoading(false);
    }, 1000);
  };

  const signup = (email, _password, name) => {
    // Le préfixe _ indique que password est intentionnellement non utilisé
    // pour cette implémentation de démonstration
    setIsLoading(true);

    // Simulation d'une inscription
    setTimeout(() => {
      setUser({
        name: name,
        email: email,
        subscription: 'Basic',
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
