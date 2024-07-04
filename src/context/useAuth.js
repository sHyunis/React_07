// 1. create
// 2. provider
// 3. useHook

// 패턴을 기억하자
import { useState, createContext, useContext } from "react";

const AuthContext = createContext( null );

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState( null );

    const login = user => setUser( user ); 
    const logout = user => setUser( null ); 


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext( AuthContext ) // Context는 AuthContext를 쓸건데 AuthContext는 { user, login, logout }를 반환한다.
}