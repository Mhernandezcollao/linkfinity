export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  username: string,
  balance: {
    $numberDecimal: string,
  },
  is_user: boolean,
  is_admin: boolean,
  login_attempts: number
  login_blocked: boolean,
  wallet_bsc: string | null,
  phone: string,
  profile_picture: string,
  membership: string,
  banned: boolean,
  last_activity: string,
  last_activity_ip: string,
  createdAt: string,
  updatedAt: string
}

