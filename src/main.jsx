import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import ManagerAdmin from './component/Admin/ManagerAdmin/ManagerAdmin.jsx'
import CreateAdmin from './component/Admin/ManagerAdmin/CreateAdmin.jsx'
import EditAdmin from './component/Admin/ManagerAdmin/EditAdmin.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import FlyCancel from './component/Admin/FlyCancel/FlyCancel.jsx'
import ListFlight from './component/Admin/ListFlight/ListFlight.jsx'
import CustomerInfo from './component/Admin/Customer-info/CustomerInfo.jsx'
import CreateFlight from './component/Admin/ListFlight/CreateFlight.jsx'
import EditFlight from './component/Admin/ListFlight/EditFlight.jsx'
import Home from './component/Admin/pages/Home.jsx'
import Main from './component/Admin/layout/Main.jsx'
import SignIn from './component/Auth/SignIn.jsx'
import Passenger from './component/Admin/passenger/Passenger.jsx'
import EditPassenger from './component/Admin/passenger/EditPassenger.jsx'
import CreatePassenger from './component/Admin/passenger/CreatePassenger.jsx'
import MainStatistics from './component/Admin/pages/MainStatistics.jsx'
import Statistics from './component/Admin/Statistics/Statistics.jsx'
import TicketSales from './component/Admin/Statistics/TicketSales.jsx'
import PopularFlight from './component/Admin/Statistics/PopularFlight.jsx'
import TicketClassRevenue from './component/Admin/Statistics/TicketClassRevenue.jsx'
import Test from './component/Admin/test.jsx'
import BookingCode from './component/Admin/BookingCode/BookingCode.jsx'
import EditBooking from './component/Admin/BookingCode/EditBooking.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path='/admins/signIn' element={<SignIn />} />
                    <Route path='/' element={<SignIn />} />
                </Routes>
                <Routes>
                    <Route path='/admins' element={<Main />}>
                        <Route path='/admins/home' element={<Home />} />
                        <Route path='/admins/test' element={<Test />} />
                        <Route path='/admins/employee' element={<ManagerAdmin />} />
                        <Route path='/admins/employee/create' element={<CreateAdmin />} />
                        <Route path='/admins/employee/edit' element={<EditAdmin />} />
                        <Route path='/admins/flyCancel' element={<FlyCancel />} />
                        <Route path='/admins/flight' element={<ListFlight />} />
                        <Route path='/admins/flight/create' element={<CreateFlight />} />
                        <Route path='/admins/flight/edit' element={<EditFlight />} />
                        <Route path='/admins/customer-info' element={<CustomerInfo />} />
                        <Route path='/admins/passenger' element={<Passenger />} />
                        <Route path='/admins/passenger/create' element={<CreatePassenger />} />
                        <Route path='/admins/passenger/edit' element={<EditPassenger />} />
                        <Route path='/admins/booking' element={<BookingCode />} />
                        <Route path='/admins/booking/edit' element={<EditBooking />} />
                        <Route path='/admins/statistics' element={<MainStatistics />}>
                            <Route path='/admins/statistics/overview' element={<Statistics />} />
                            <Route path='/admins/statistics/ticket-sales' element={<TicketSales />} />
                            <Route path='/admins/statistics/popular-flight' element={<PopularFlight />} />
                            <Route path='/admins/statistics/ticket-class-revenue' element={<TicketClassRevenue />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
