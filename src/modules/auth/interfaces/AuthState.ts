import type { User } from "./User"

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    token: string | null
    user: User | null
}
