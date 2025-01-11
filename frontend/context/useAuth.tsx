import { View } from "react-native";
import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { AuthContextTypes, User } from "@/types/types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultAuthContext: AuthContextTypes = {
    currentUser: null,
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isLoading: true,
  };
  
  export const AuthContext = createContext<AuthContextTypes>(defaultAuthContext);

interface ChildrenProps {
    children : ReactNode
}

export default function AuthProvider ( { children } : ChildrenProps ): ReactElement {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if(!token) {
                    setIsAuthenticated(false);
                    return;
                }
                const res = await axios.get("https://luminaai-chatbot.onrender.com/api/currentuser", {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });

                if(res.status === 200) {
                    setCurrentUser(res.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getCurrentUser();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, currentUser, setIsAuthenticated }}>
            { children }
        </AuthContext.Provider>
    )
}