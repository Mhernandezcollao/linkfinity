import { Instances } from "../../core/api/Instances";
import { rejectApiError } from "../../core/helpers/RejectApiError";
import type { LoginData, ProfileData, RegisterData, SetPasswordData } from "../interfaces";


// ################################# POST #################################

const login = (data: LoginData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/login', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const register = (data: RegisterData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/register', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const restorePassword = (email: string) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/restore-password', { email })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const setPassword = (data: SetPasswordData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/set-password', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const verifyEmail = (email: string) => {
    return new Promise((resolve, reject) => {
        Instances.MS_VERIFY_EMAIL.post('/api/verified-emails/initiate', { email })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

// ################################# GET #################################

const getAccountInformation = () => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.get('/api/auth/me')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}
const getChildrens = (userId: string, page: number, limit: number) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.get(`/api/auth/childrens/${userId}?page=${page}&limit=${limit}`)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

// ################################# PUT #################################

const updateProfile = (data: ProfileData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.put('/api/auth/details', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

// ################################# DELETE #################################



export {
    login,
    register,
    restorePassword,
    setPassword,
    verifyEmail,
    getAccountInformation,
    getChildrens,
    updateProfile
}