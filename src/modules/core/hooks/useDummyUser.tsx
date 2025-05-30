import { useState } from 'react';
import { useToast } from './useToast';
import type { User } from '../../auth/interfaces';

export const useDummyUser = () => {
    
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [dummyUser, setDummyUser] = useState<User>();

    const loadDummyUser = async () => {
        setLoading(true);

        try {
            setDummyUser(
                {
                    "_id": "681938db0f112d3e5f636735",
                    "firstname": "Anibal",
                    "lastname": "Figueroa",
                    "email": "anibaljeesus19972@gmail.com",
                    "username": "anibalfigueroa",
                    "balance": {
                        "$numberDecimal": "0"
                    },
                    "is_user": true,
                    "is_admin": false,
                    "login_attempts": 0,
                    "login_blocked": false,
                    "wallet_bsc": null,
                    "phone": "",
                    "profile_picture": "https://i.pinimg.com/236x/e6/d7/d2/e6d7d2c2c09bfc5b1aadbedbfdfbe435.jpg",
                    "membership": "FREE",
                    "banned": false,
                    "last_activity": "2025-05-05T22:39:38.415Z",
                    "last_activity_ip": "::1",
                    "createdAt": "2025-05-05T22:16:59.438Z",
                    "updatedAt": "2025-05-05T22:39:38.416Z"
                }
            )
            setLoading(false);

        } catch (e: any) {
            showToast('Error', e, 'error');
            setLoading(false);
        }
    };
    return {
        loadDummyUser,
        dummyUser,
        loading
    }
}
