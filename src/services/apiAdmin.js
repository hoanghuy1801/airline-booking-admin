import axios from '../utils/awiosCustomize'

const postLogin = (data) => {
    return axios.post('api/v1/auth/login', data)
}
const getAirports = () => {
    return axios.get('api/v1/airport/all')
}
const getCountries = () => {
    return axios.get('api/v1/app/countries')
}
const getListAircraft = (data) => {
    return axios.get('/api/v1/aircraft', {
        params: data
    })
}
const getInforEmployee = () => {
    return axios.get('/api/v1/employee/info')
}
const createEmpolyee = (data) => {
    return axios.post('/api/v1/employee', data)
}
const getListEmployee = (data) => {
    return axios.get('/api/v1/employee', {
        params: data
    })
}
const getListFlight = (status, data) => {
    return axios.get(`/api/v1/flight/${status}`, {
        params: data
    })
}
const createFlight = (data) => {
    return axios.post('/api/v1/flight', data)
}
const actEmployee = (id) => {
    return axios.patch(`api/v1/employee/open/${id}`)
}
const penEmployee = (id) => {
    return axios.patch(`/api/v1/employee/${id}`)
}
const delEmployee = (id) => {
    return axios.delete(`/api/v1/employee/${id}`)
}
const getEmployeeId = (id) => {
    return axios.get(`/api/v1/employee/${id}`)
}
const editEmployee = (id, data) => {
    return axios.put(`/api/v1/employee/${id}`, data)
}
const changeStatusFlight = (id, status) => {
    return axios.patch(`/api/v1/flight/${id}?status=${status}`)
}
const getFlightId = (id) => {
    return axios.get(`/api/v1/flight/id/${id}`)
}
const editFlight = (id, data) => {
    return axios.put(`/api/v1/flight/${id}`, data)
}
const getListBooking = (status, data) => {
    return axios.get(`/api/v1/booking/${status}`, {
        params: data
    })
}
const getListPassgenger = (data) => {
    return axios.get('/api/v1/passenger', {
        params: data
    })
}
const updateStatusPassenger = (id, status) => {
    return axios.patch(`/api/v1/passenger/${id}?status=${status}`)
}
const getPassengerById = (id) => {
    return axios.get(`/api/v1/passenger/${id}`)
}
const editPassenger = (id, data) => {
    return axios.put(`/api/v1/passenger/${id}`, data)
}
const reportClient = () => {
    return axios.get('/api/v1/admin/report-client')
}
const get10BookingNew = () => {
    return axios.get('api/v1/admin/booking-limit-ten')
}
const getRevenueInTwoYear = () => {
    return axios.get('api/v1/admin/revenue-in-two-year')
}
const updateCancelBooking = (data) => {
    return axios.patch('api/v1/booking/change-status', data)
}
const getBooking = (status, data) => {
    return axios.get(`api/v1/booking/admin/${status}`, {
        params: data
    })
}
const CancelBooking = (data) => {
    return axios.patch('/api/v1/booking/cancel', data)
}
const CreatePassenger = (data) => {
    return axios.post('/api/v1/passenger', data)
}

export {
    getAirports,
    getCountries,
    getListAircraft,
    getInforEmployee,
    createEmpolyee,
    getListEmployee,
    createFlight,
    getListFlight,
    actEmployee,
    penEmployee,
    delEmployee,
    getEmployeeId,
    editEmployee,
    changeStatusFlight,
    getFlightId,
    editFlight,
    postLogin,
    getListBooking,
    getListPassgenger,
    updateStatusPassenger,
    getPassengerById,
    editPassenger,
    reportClient,
    get10BookingNew,
    getRevenueInTwoYear,
    updateCancelBooking,
    getBooking,
    CancelBooking,
    CreatePassenger
}
