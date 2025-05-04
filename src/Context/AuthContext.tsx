/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  accessToken: string | null;

  user: any;
  setAccessToken: (token: string | null) => void;
  setUser: (user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (token) setAccessToken(token);
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAccessToken, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
