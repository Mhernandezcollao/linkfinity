import { Instances } from "../../core/api/Instances";
import { rejectApiError } from "../../core/helpers/RejectApiError";


// ################################# POST #################################

const adquireMemberSmart = () => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/adquire-member-smart')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const adquireMemberVip = () => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/adquire-member-vip')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}


// ################################# GET #################################

const getMyMembershipPayments = () => {
    return new Promise((resolve, reject) => {
        Instances.MS_TRANSACTION.get('/api/membership-payments/me')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

// ################################# PUT #################################


// ################################# DELETE #################################



export {
    adquireMemberSmart,
    adquireMemberVip,
    getMyMembershipPayments
}