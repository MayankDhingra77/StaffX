import react from 'react'
import { createContext } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { useState , useEffect } from 'react';
export const AuthContext = createContext()
export default function AuthProvider({ children }) {
    // localStorage.clear()
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        setLocalStorage()
        const { employees, admin } = getLocalStorage()
        setUserData({ employees, admin })
    }, [])
    return (
        <>
            <AuthContext.Provider value={userData}>
                {children}
            </AuthContext.Provider>
        </>
    )
}