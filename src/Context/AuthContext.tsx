// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type AuthContextType = {
//   accessToken: string | null;

//   user: any;
//   setAccessToken: (token: string | null) => void;
//   setUser: (user: any) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const userData = localStorage.getItem("user");

//     if (token) setAccessToken(token);
//     if (userData && userData !== "undefined") {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("user"); // optional cleanup
//       }
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setAccessToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ accessToken, user, setAccessToken, setUser, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// context/AuthContext.tsx
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (token) setAccessToken(token);
    if (userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  const value = {
    accessToken,
    user,
    setAccessToken: (token: string | null) => {
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
      setAccessToken(token);
    },
    setUser: (user: User | null) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      setUser(user);
    },
    logout,
    isAuthenticated: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
