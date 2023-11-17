/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Row, Col, Breadcrumb, Typography, Dropdown, Space } from 'antd'
import { IconUser, IconUserSquareRounded, IconCaretLeft } from '@tabler/icons-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setInforEmployee } from '../../../redux/reducers/Admin'
const { Text } = Typography
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
const profile = [
    <svg width='40' height='40' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' key={0}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z'
            fill='#111827'
        ></path>
    </svg>
]

// eslint-disable-next-line react/prop-types
function Header({ name }) {
    useEffect(() => window.scrollTo(0, 0))
    const navigate = useNavigate()
    const dispastch = useDispatch()
    const onClick = (e) => {
        if (e.key === '0') {
            navigate('/admins/customer-info')
        } else if (e.key === '1') {
            dispastch(setInforEmployee(null))
            navigate('/')
        }
    }
    return (
        <div>
            <Row gutter={[24, 0]}>
                <Col
                    span={24}
                    md={24}
                    style={{ paddingRight: '7%', display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
                >
                    <IconUserSquareRounded size={30} />
                    <Dropdown
                        menu={{
                            items,
                            onClick
                        }}
                    >
                        <Space style={{ fontSize: 18, fontWeight: 600, color: 'black', paddingLeft: 10 }}>
                            Pham Hoang Huy
                        </Space>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    )
}

export default Header
