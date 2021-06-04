
export class User {

  id: number = 0

  email?: string

  mobile?: string

  password?: string

  country?: string

  region?: string

  accountType?: string

  isMobileVerified: boolean = false

  isEmailVerified: boolean = false

}

export default User
