import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signUp(email, password) {
    console.log(email, password);
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function reset(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const store = {
    user,
    signUp,
    login,
    logOut,
    reset
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
