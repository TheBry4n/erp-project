export type Session = {
    tokensInfo: {
        accessToken: string,
        ATExpiredTime: string,
        refreshToken: string,
        RTExpiredTime: string
    },
    userInfo: {
        nome: string,
        cognome:string,
        email: string,
        role: string,
        dateOfAccess: Date
    }
}