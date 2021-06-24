import { createContext } from 'react'

const TokenContext = createContext({
    accessToken: null,
    adminToken: null
});

export { TokenContext }
export const TokenProvider = TokenContext.Provider
export const TokenConsumer = TokenContext.Consumer