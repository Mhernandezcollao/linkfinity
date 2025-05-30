import { useState } from 'react';
import { useToast } from '../../core/hooks';
import { restorePassword, setPassword } from '../api/Api';
import type { SetPasswordData } from '../interfaces';

export const useRestorePassword = () => {

    const { showToast } = useToast();
    const [loadingRecoverPassword, setLoadingRecoverPassword] = useState(false);
    const [loadingCreateNewPassword, setLoadingCreateNewPassword] = useState(false);

    const recoverPassword = async (email: string) => {
        setLoadingRecoverPassword(true);

        try {
            const resp: any = await restorePassword(email);
            const { message } = resp;
            showToast('Éxito', message, 'success');
            setLoadingRecoverPassword(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setLoadingRecoverPassword(false);
        }
    };

    const createNewPassword = async (data: SetPasswordData) => {
        setLoadingCreateNewPassword(true);

        try {
            const resp: any = await setPassword(data);
            const { message } = resp;
            showToast('Éxito', message, 'success');
            setLoadingCreateNewPassword(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setLoadingCreateNewPassword(false);
        }
    };
    
    return {
        recoverPassword,
        loadingRecoverPassword,
        createNewPassword,
        loadingCreateNewPassword
    }
}
