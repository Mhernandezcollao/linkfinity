import type { AuthState, User } from "../interfaces"


type AuthAction =
	| {
		type: 'signIn',
		payload: {
			token: string,
			user: User
		}
	}
	| {
		type: 'updateUser',
		payload: {
			user: User
		}
	}
	| { type: 'notAuthenticated' }
	| { type: 'logout' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

	switch (action.type) {
		case 'signIn':
			return {
				...state,
				status: 'authenticated',
				token: action.payload.token,
				user: action.payload.user
			}

		case 'updateUser':
			return {
				...state,
				user: action.payload.user,
			}

		case 'logout':
		case 'notAuthenticated':
			return {
				...state,
				status: 'not-authenticated',
				token: null,
				user: null,
			}

		default:
			return state;
	}
}; 