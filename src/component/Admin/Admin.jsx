import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined, RollbackOutlined } from '@ant-design/icons'
import { IconUserCog, IconUser, IconPlaneTilt, IconCaretLeft } from '@tabler/icons-react'
import { Layout, Menu, Button, theme, Row, Avatar, Col, Dropdown, Space, Typography } from 'antd'
import '../Admin/Admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInforEmployee } from '../../redux/reducers/Admin'
import Main from '../Admin/layout/Main'
const { Text } = Typography
const { Header, Sider, Content } = Layout
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    }
}
const items = [
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <IconUser size={25} style={{ marginTop: 6, color: '#00a1e4' }} />
                </div>
                <div>
                    <Text style={{ color: '#00a1e4', fontSize: 15, fontWeight: 500, paddingLeft: 5 }}>
                        Xem thông tin tài khoản
                    </Text>
                </div>
            </div>
        ),
        key: '0'
    },
    {
        type: 'divider'
    },
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <IconCaretLeft size={25} style={{ marginTop: 6, color: 'red' }} />
                </div>
                <div>
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 500, paddingLeft: 3 }}> Đăng xuất</Text>
                </div>
            </div>
        ),
        key: '1'
    }
]
const itemss = [
    getItem('Tài khoản', 'customer-info', <IconUser />),
    getItem('Quản lý nhân viên', 'employee', <IconUserCog />),
    getItem('Chuyến bay', 'sub1', <IconPlaneTilt />, [
        getItem('Danh sách', 'listflight'),
        getItem('Hủy/ Hoàn Tiền', 'flyCancel')
    ]),
    getItem('Trở về', 'backgoHomePage', <RollbackOutlined />)
]

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    const navigate = useNavigate()
    const dispastch = useDispatch()
    const handleMenu = (info) => {
        if (info.key === 'backgoHomePage') {
            navigate('/')
        } else if (info.key === 'employee') {
            navigate('/admins/employee')
        } else if (info.key === 'flyCancel') {
            navigate('/admins/flyCancel')
        } else if (info.key === 'listflight') {
            navigate('/admins/flight/listflight')
        } else if (info.key === 'customer-info') {
            navigate('/admins/customer-info')
        }
    }
    const handleClickMe = (e) => {
        if (e.key === '0') {
            navigate('/admins/customer-info')
        } else if (e.key === '1') {
            dispastch(setInforEmployee(null))
            navigate('/')
        }
    }
    const InforEmployee = useSelector((state) => state.Admin.InforEmployee)
    return (
        <Layout className='menu-dashboard'>
            <Main />
        </Layout>
    )
}
export default Admin
