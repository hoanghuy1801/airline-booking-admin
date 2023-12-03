import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../../assets/vivu.png'
import {
    IconPlaneTilt,
    IconPlaneOff,
    IconUserFilled,
    IconBrandApplePodcast,
    IconChartBar,
    IconTicket
} from '@tabler/icons-react'
import jwt from '../../../utils/jwt'
function Sidenav({ color }) {
    const { pathname } = useLocation()
    const page = pathname.replace('/', '')
    const profiles = [
        <svg width='22' height='22' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' key={0}>
            <path
                d='M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z'
                fill='#fff'
            ></path>
            <path
                d='M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z'
                fill='#fff'
            ></path>
            <path
                d='M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z'
                fill='#fff'
            ></path>
            <path d='M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z' fill='#fff'></path>
        </svg>
    ]
    const dashboard = [
        <svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' key={0}>
            <path
                d='M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z'
                fill={color}
            ></path>
            <path
                d='M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z'
                fill={color}
            ></path>
            <path
                d='M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z'
                fill={color}
            ></path>
        </svg>
    ]
    return (
        <>
            <div className='brand' style={{ marginLeft: 20 }}>
                <img src={logo} alt='' />
            </div>
            <hr />
            <Menu theme='light' mode='inline'>
                <Menu.Item key='1'>
                    <NavLink to='/admins/home'>
                        <span
                            className='icon'
                            style={{
                                background: page === 'admins' ? color : ''
                            }}
                        >
                            {dashboard}
                        </span>
                        <span className='label'>Chung</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='2'>
                    <NavLink to='/admins/customer-info'>
                        <IconUserFilled
                            className='icon'
                            style={{
                                background: page === 'admins/customer-info' ? color : '',
                                padding: 5
                            }}
                        />
                        <span className='label'>Tài khoản</span>
                    </NavLink>
                </Menu.Item>
                {jwt.getUserRole() !== 'EMPLOYEE' ? (
                    <Menu.Item key='3'>
                        <NavLink to='/admins/employee'>
                            <span
                                className='icon'
                                style={{
                                    background: page === 'admins/employee' ? color : ''
                                }}
                            >
                                {profiles}
                            </span>

                            <span className='label'>Nhân viên</span>
                        </NavLink>
                    </Menu.Item>
                ) : (
                    ''
                )}

                <Menu.Item key='4'>
                    <NavLink to='/admins/flight'>
                        <IconPlaneTilt
                            className='icon'
                            style={{
                                color:
                                    page === 'admins/flight' ||
                                    page === 'admins/flight/create' ||
                                    page === 'admins/flight/edit'
                                        ? color
                                        : ''
                            }}
                        />

                        <span className='label'>Chuyến Bay</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='5'>
                    <NavLink to='/admins/booking'>
                        <IconTicket
                            className='icon'
                            style={{
                                color: page === 'admins/booking' || page === 'admins/booking/edit' ? color : ''
                            }}
                        />

                        <span className='label'> Quản Lý Đặt Vé</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='6'>
                    <NavLink to='/admins/flyCancel'>
                        <IconPlaneOff
                            className='icon'
                            style={{
                                color: page === 'admins/flyCancel' ? color : ''
                            }}
                        />

                        <span className='label'>Hủy/Hoàn Tiền</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='7'>
                    <NavLink to='/admins/passenger'>
                        <IconBrandApplePodcast
                            className='icon'
                            style={{
                                color:
                                    page === 'admins/passenger' ||
                                    page === 'admins/passenger/create' ||
                                    page === 'admins/passenger/edit'
                                        ? color
                                        : ''
                            }}
                        />

                        <span className='label'>Khách Hàng</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='8'>
                    <NavLink
                        to='/admins/statistics/overview'
                        style={{
                            backgroundColor:
                                page === 'admins/statistics/overview' ||
                                page === 'admins/statistics/ticket-sales' ||
                                page === 'admins/statistics/popular-flight' ||
                                page === 'admins/statistics/ticket-class-revenue'
                                    ? '#fff'
                                    : '',
                            boxShadow: '0 20px 27px rgb(0 0 0 / 5%)'
                        }}
                    >
                        <IconChartBar
                            className='icon'
                            style={{
                                backgroundColor:
                                    page === 'admins/statistics/overview' ||
                                    page === 'admins/statistics/ticket-sales' ||
                                    page === 'admins/statistics/popular-flight' ||
                                    page === 'admins/statistics/ticket-class-revenue'
                                        ? color
                                        : '',
                                color:
                                    page === 'admins/statistics/overview' ||
                                    page === 'admins/statistics/ticket-sales' ||
                                    page === 'admins/statistics/popular-flight' ||
                                    page === 'admins/statistics/ticket-class-revenue'
                                        ? color
                                        : ''
                            }}
                        />

                        <span className='label'>Thống Kê</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default Sidenav
