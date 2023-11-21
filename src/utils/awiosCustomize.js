import axios from 'axios'

// NProgress.configure({
//     showSpinner: false,
//     trickleSpeed: 100,

//})

const instance = axios.create({
    //baseURL: 'https://airline-booking-api.onrender.com'
    baseURL: 'http://localhost:8008'
})

instance.interceptors.request.use((config) => {
    // Lấy ngôn ngữ từ localStorage hoặc từ ngôn ngữ mặc định
    const language = localStorage.getItem('language') || 'vi'
    const accessToken = localStorage.getItem('accessToken')
    // Thêm header 'Accept-Language'
    config.headers['Accept-Language'] = language

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
    }
    config.headers['X-Request-Source'] = 'web' // Thay 'your-source-value' bằng giá trị thích hợp

    // Thêm header "Authorization"
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
})

export default instance
