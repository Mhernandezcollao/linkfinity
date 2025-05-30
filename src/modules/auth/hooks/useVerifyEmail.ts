import { useState } from 'react';
import { useToast } from '../../core/hooks';
import { verifyEmail } from '../api/Api';

export const useVerifyEmail = () => {

    const { showToast } = useToast();
    const [loadingEmailVerification, setLoadingEmailVerification] = useState(false);

    const emailVerification = async (email: string) => {
        setLoadingEmailVerification(true);

        try {
            const resp: any = await verifyEmail(email);
            const { message } = resp;
            showToast('Éxito', message, 'success');
            setLoadingEmailVerification(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setLoadingEmailVerification(false);
        }
    };
    
    return {
        emailVerification,
        loadingEmailVerification
    }
}
