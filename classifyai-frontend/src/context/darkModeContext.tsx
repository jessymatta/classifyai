import { createContext, useReducer } from "react"
import { DarkModeReducer } from "./darkModeReducer"

const INITIAL_STATE:any|React.Dispatch<any> = {
    darkMode: false
}

export const DarkModeContext = createContext(INITIAL_STATE)

interface DarkModeContextProviderProps{
    children:React.ReactNode
}

export const DarkModeContextProvider = ({children}:DarkModeContextProviderProps) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE)

    return(
        <DarkModeContext.Provider value={{darkMode:state.darkMode,dispatch }}> 
        {children}  
        </DarkModeContext.Provider>
    )
}