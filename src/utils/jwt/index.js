// import { logoutSuccess } from '../store/authSlice';

function isAdmin(token) {

    const role = JSON.parse(atob(token.split('.')[1]));
    // const expirationDate = new Date(role.exp);

    // if (expirationDate <= new Date()) {
    //     logoutSuccess();
    //     return false;
    // }
    if (role.roles.includes('ROLE_ADMIN')) {
        return true;
    }
    return false;
}

export default isAdmin;
