import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    doctor: JSON.parse(localStorage.getItem('isDoctor')) || null,
    loading: null,
    error: null,
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                doctor: false,
                loading: true,
                error: null,
        
            }
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: null,
                doctor: false,
                error: null,
          
            }
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                doctor: false,
                error: action.payload,
              
            }
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
                doctor: false,

            }
        case 'DOCTOR_LOGIN_START':
            return {
                user: null,
                doctor: false,
                loading: true,
                error: null,
           
            }
        case 'LOGIN_DOCTOR_SUCCESS':
            return {
                user: action.payload,
                loading: null,
                doctor: true,
                error: null,
          
            }
        case 'LOGIN_DOCTOR_FAILURE':
            return {
                user: null,
                loading: false,
                doctor: false,
                error: action.payload,
             
            }
        case 'DOCTOR_LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
                doctor: false,
            
            }

        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('isDoctor',JSON.stringify(state.doctor))
    })

    return <AuthContext.Provider value={{ ...state, dispatch }} >
        {children}
    </AuthContext.Provider>
}