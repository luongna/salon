import { logoutSuccess } from "./authSlice"

export const logout=(dispatch, navi)=>{
    dispatch(logoutSuccess);
}