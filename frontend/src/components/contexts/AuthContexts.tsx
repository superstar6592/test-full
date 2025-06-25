// contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

interface User {
  id: string;
  email: string;
  displayName?: string;
  fullName?: string;
  avatar?: string;
  photoURL?: string;
  role?: string | { id: string; name: string; _id?: string };
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Safe localStorage operations
  const safeGetLocalStorage = (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error(`Error reading localStorage key ${key}:`, error);
      return null;
    }
  };

  const safeSetLocalStorage = (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting localStorage key ${key}:`, error);
    }
  };

  const safeRemoveLocalStorage = (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key ${key}:`, error);
    }
  };

  // Clear authentication data
  const clearAuthData = () => {
    safeRemoveLocalStorage("freelancingPlatformAuthToken");
    safeRemoveLocalStorage("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = safeGetLocalStorage("freelancingPlatformAuthToken");
        const userStr = safeGetLocalStorage("user");

        if (!token || !userStr) {
          clearAuthData();
          setIsLoading(false);
          return;
        }

        try {
          const parsedUser = JSON.parse(userStr);

          if (!parsedUser || typeof parsedUser !== "object") {
            console.warn("Invalid user object in localStorage");
            clearAuthData();
            setIsLoading(false);
            return;
          }

          setUser(parsedUser);
          setIsLoggedIn(true);
          setIsLoading(false);
        } catch (parseError) {
          console.error("Failed to parse user from localStorage:", parseError);
          clearAuthData();
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        clearAuthData();
        setIsLoading(false);
      }
    };

    // Small delay to ensure localStorage is ready
    const timeoutId = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Login function
  const login = (token: string, userData: User) => {
    try {
      safeSetLocalStorage("freelancingPlatformAuthToken", token);
      safeSetLocalStorage("user", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Use the imported auth instance instead of getAuth()
      await signOut(auth);
      clearAuthData();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if Firebase signOut fails, clear local state
      clearAuthData();
      router.push("/sign-in");
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    safeSetLocalStorage("user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
