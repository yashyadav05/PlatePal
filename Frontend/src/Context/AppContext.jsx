import React, { createContext, useContext } from 'react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const AppContext = createContext()
export default function AppProvider({ children }) {
    const value = {
        axios
    }
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export function useAppContext(){
    return useContext(AppContext)
}