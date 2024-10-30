export interface ILoginPayload {
  email: string
  password: string
}

export interface IRegisterPayload {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
  sex: string
}

export interface ILoginResponse {
  message?: string
  url?: string
  accessToken?: string
  refreshToken?: string
}

export interface IRegisterResponse {
  url: string
}

export interface IVerifyEmailPayload {
  q: string
  otp: string
}

export interface IVerifyEmailResponse {
  url: string
}
