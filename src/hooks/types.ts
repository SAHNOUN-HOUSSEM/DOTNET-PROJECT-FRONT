export interface IAuth {
    accessToken?: string,
    adminId?: string
}

export interface IAuthContext {
    auth?: IAuth,
    setAuth?: (auth: IAuth | ((prev: IAuth) => IAuth)) => void
}