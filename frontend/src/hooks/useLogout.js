import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        dispatch({type:'LOGOUT'})
        dispatch({type:'DOCTOR_LOGOUT'})
    }

    return {logout}
}