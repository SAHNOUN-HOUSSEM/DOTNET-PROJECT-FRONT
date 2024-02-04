export interface IAuth {
    accessToken?: string,
    userId?: string
}

export interface IAuthContext {
    auth?: IAuth,
    setAuth?: (auth: IAuth | ((prev: IAuth) => IAuth)) => void
}