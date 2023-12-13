import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://airline-booking-api.onrender.com'
    //baseURL: 'http://localhost:8008'
})

instance.interceptors.request.use((config) => {
    const language = localStorage.getItem('language') || 'vi'
    const accessToken = localStorage.getItem('accessToken')

    config.headers['Accept-Language'] = language

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
    }
    config.headers['X-Request-Source'] = 'web'

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
})

export default instance
