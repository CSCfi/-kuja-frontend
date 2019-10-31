import { LOGOUT_USER_START } from "./actionTypes";


export function logoutUser(dispatch) {
    dispatch({ type: LOGOUT_USER_START });
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("oid");
    sessionStorage.removeItem("role");
}