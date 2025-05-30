import { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from './AuthReducer';
import { useToast } from '../../core/hooks';
import { getAccountInformation, login, register } from '../api/Api';
import type { AuthState, LoginData, RegisterData, User } from '../interfaces';

interface AuthContextProps {
	status: 'checking' | 'authenticated' | 'not-authenticated'
	token: string | null
	user: User | null
	loadingSignIn: boolean
	loadingSignUp: boolean
	loadUser: () => void
	// signIn: (loginData: LoginData, remember: boolean) => void
	signIn: (loginData: LoginData) => void
	signUp: (registerData: RegisterData) => void
	logOut: () => void,
}

const authInitialState: AuthState = {
	status: 'checking',
	token: null,
	user: null
}

const STORAGE_KEY_TOKEN = '@STORAGE_KEY_TOKEN';
export const STORAGE_KEY_REMEMBER_EMAIL = '@STORAGE_KEY_REMEMBER_EMAIL';
export const STORAGE_KEY_REMEMBER_PASSWORD = '@STORAGE_KEY_REMEMBER_PASSWORD';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

	const { showToast } = useToast();
	const [state, dispatch] = useReducer(authReducer, authInitialState);
	const [loadingSignIn, setLoadingSignIn] = useState(false);
	const [loadingSignUp, setLoadingSignUp] = useState(false);

	useEffect(() => {
		loadUser();
	}, []);
	
	const loadUser = async () => {
		const token = await localStorage.getItem(STORAGE_KEY_TOKEN);
		const viewWatched = await localStorage.getItem('video watched');

		if (viewWatched === undefined || viewWatched === null) {
			localStorage.setItem('video watched', 'false');
		}

		if (!token) return dispatch({ type: 'notAuthenticated' });

		try {
			const response: any = await getAccountInformation();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user: response
				}
			});

		} catch (e: any) {
			await localStorage.removeItem(STORAGE_KEY_TOKEN);
			dispatch({ type: 'notAuthenticated' });
			showToast('Error', e, 'error');
		}
	};

	// const signIn = async (data: LoginData, remember: boolean) => {
	const signIn = async (data: LoginData) => {
		setLoadingSignIn(true);

		try {
			const login_response: any = await login(data);
			const { message, token } = login_response;
			await localStorage.setItem(STORAGE_KEY_TOKEN, token);
			const user: any = await getAccountInformation();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user
				}
			});

			showToast('¡Bienvenid@!', message, 'success');
			setLoadingSignIn(false);

			// if (remember) {
			// 	localStorage.setItem(STORAGE_KEY_REMEMBER_EMAIL, data.email);
			// 	localStorage.setItem(STORAGE_KEY_REMEMBER_PASSWORD, data.password);
			// } else {
			// 	localStorage.removeItem(STORAGE_KEY_REMEMBER_EMAIL);
			// 	localStorage.removeItem(STORAGE_KEY_REMEMBER_PASSWORD);
			// }

		} catch (e: any) {
			setLoadingSignIn(false);
			showToast('Error', e, 'error');
		}
	};
	const signUp = async (data: RegisterData) => {
		setLoadingSignUp(true);

		try {
			const register_response: any = await register(data);
			const { message } = register_response;
			showToast('¡Bienvenid@!', message, 'success');
			setLoadingSignUp(false);
			return { success: true };

		} catch (e: any) {
			setLoadingSignUp(false);
			showToast('Error', e, 'error');
		}
	};

	const logOut = () => {
		localStorage.removeItem(STORAGE_KEY_TOKEN);
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{
			...state,
			loadingSignIn,
			loadingSignUp,
			loadUser,
			signIn,
			signUp,
			logOut
		}}>
			{children}
		</AuthContext.Provider>
	)
}