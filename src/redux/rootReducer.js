import { combineReducers } from '@reduxjs/toolkit'

import Admin from './reducers/Admin'

// Store
const rootReducer = combineReducers({
    Admin: Admin
})

// Export
export default rootReducer
