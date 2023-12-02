import jwtDecode from 'jwt-decode'

const JWTManager = () => {
    let inMemoryToken = null
    let userRole = null

    const getToken = () => inMemoryToken
    const getUserRole = () => userRole

    const setToken = (accessToken) => {
        inMemoryToken = accessToken
        const decoded = jwtDecode(accessToken)
        userRole = decoded.role
        localStorage.setItem('accessToken', inMemoryToken)
    }

    const deleteToken = () => {
        localStorage.removeItem('accessToken')
    }

    return { getToken, setToken, getUserRole, deleteToken }
}

export default JWTManager()
