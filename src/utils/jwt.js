import jwtDecode from 'jwt-decode'

const JWTManager = () => {
    let inMemoryToken = null
    let userRole = null

    const getToken = () => inMemoryToken
    const getUserRole = () => userRole

    const setToken = (accessToken) => {
        inMemoryToken = accessToken
        // decode and set countdown to refresh
        const decoded = jwtDecode(accessToken)
        userRole = decoded.role
        // //  setRefreshTokenTimeOut(Number(decoded.exp) - Number(decoded.iat));
        localStorage.setItem('accessToken', inMemoryToken)
    }

    const deleteToken = () => {
        // decode and set countdown to refresh
        // const decoded = jwtDecode(accessToken)
        // userId = decoded._id
        // //  setRefreshTokenTimeOut(Number(decoded.exp) - Number(decoded.iat));
        localStorage.removeItem('accessToken') // Th
    }

    return { getToken, setToken, getUserRole, deleteToken }
}

export default JWTManager()
