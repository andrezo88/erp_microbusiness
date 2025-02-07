export interface IUserRequest {
 name: string
 email: string
 password: string
}

export interface IUserResponse {
 _id: string
 name: string
 email: string
}

export interface IUserLogin {
 email: string
 password: string
}

export interface IUserLoginResponse {
 _id: string
 name: string
 email: string
 role: number
}

export interface IUserRequestUpdate extends IUserRequest {
 role: number
}