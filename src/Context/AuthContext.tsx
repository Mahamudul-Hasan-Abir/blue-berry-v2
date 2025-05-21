// "use client";

// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   role: string | null;
//   profileImage: string;
//   // Add other user properties as needed
// };

// type AuthContextType = {
//   accessToken: string | null;
//   user: User | null;
//   setAccessToken: (token: string | null) => void;
//   setUser: (user: User | null) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
//   loading: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const userData = localStorage.getItem("user");

//     if (token) setAccessToken(token);
//     if (userData && userData !== "undefined") {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("user");
//       }
//     }
//     setLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setAccessToken(null);
//     setUser(null);
//   };

//   const value = {
//     accessToken,
//     user,
//     setAccessToken: (token: string | null) => {
//       if (token) {
//         localStorage.setItem("accessToken", token);
//       } else {
//         localStorage.removeItem("accessToken");
//       }
//       setAccessToken(token);
//     },
//     setUser: (user: User | null) => {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user");
//       }
//       setUser(user);
//     },
//     logout,
//     isAuthenticated: !!accessToken,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

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
  role: string | null;
  profileImage: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
