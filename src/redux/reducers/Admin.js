import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    InforEmployee: '',
    isAuthenticatedEmployee: false,
    employeeById: null,
    flightById: null
}
const Admin = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        setInforEmployee: (state, action) => {
            state.InforEmployee = action.payload
        },
        setIsAuthenticatedEmployee: (state, action) => {
            state.isAuthenticatedAdmin = action.payload
        },
        setEmployeeById: (state, action) => {
            state.employeeById = action.payload
        },
        setFlightById: (state, action) => {
            state.flightById = action.payload
        }
    }
})

export const { setInforEmployee, setIsAuthenticatedEmployee, setEmployeeById, setFlightById } = Admin.actions
// Export reducer
export default Admin.reducer
