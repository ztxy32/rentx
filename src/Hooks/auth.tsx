import React, { createContext, ReactNode, useContext, useState } from 'react';
import api from '../services/api';

interface UserData{
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}
interface AuthState{
    token: string;
    user: UserData;
}
interface SingInCredentials{
    email: string;
    password: string;
}
interface AuthContextData{
    user: UserData;
    signIn: (credentials: SingInCredentials) => Promise<void>;
}
interface AuthProviderProps{
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
function AuthProvider({ children }: AuthProviderProps){
    const [data, setData] = useState<AuthState>({} as AuthState)

    async function signIn({ email, password }: SingInCredentials){
        const response = await api.post("/sessions", { email, password })

        console.log(response.data)
    }
    return(
        
        <AuthContext.Provider value={{user: data.user, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData{
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }