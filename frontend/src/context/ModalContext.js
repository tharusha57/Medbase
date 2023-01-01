import { createContext , useReducer } from "react";

export const ModalContext = createContext()

const initial_state = {
    OpenModal : false,
    OpenNavbar : false
}

const modalReducer = (state , action) =>{
    switch(action.type){
        case 'OPEN_MODAL':
            return {
                OpenModal : true,
                OpenNavbar : false
                
            }
        case 'CLOSE_MODAL':
            return {
                OpenModal : false,
                OpenNavbar : false
            }
        case 'OPEN_NAVBAR':
            return {
                OpenModal : false,
                OpenNavbar : true
            }
        case 'CLOSE_NAVBAR':
            return {
                OpenModal : false,
                OpenNavbar : false
            }        
        default:
            return state
    }
}

export const ModalContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(modalReducer , initial_state)

    return <ModalContext.Provider value={{...state , dispatch}}>
        {children}
    </ModalContext.Provider>
}