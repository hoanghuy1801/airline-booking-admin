import { useEffect, useState } from 'react'

import { Menu, Row } from 'antd'

import 'dayjs/locale/vi'

import { Outlet, useNavigate } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
const MainStatistics = () => {
    const [current, setCurrent] = useState('all')
    useEffect(() => {
        if (current === 'all') {
            navigate('/admins/statistics/overview')
        }
    }, [])
    const items = [
        {
            label: 'Tổng Quan',
            key: 'all'
        },
        {
            label: 'Chặng Bay Phổ Biến',
            key: 'popularFlight'
        },
        {
            label: 'Doanh Số Bán Vé',
            key: 'ticketSales'
        },
        {
            label: 'Doanh Thu Hạng Vé',
            key: 'ticketClassRevenue'
        }
    ]
    const navigate = useNavigate()
    const onClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'all') {
            navigate('/admins/statistics/overview')
        } else if (e.key === 'ticketSales') {
            navigate('/admins/statistics/ticket-sales')
        } else if (e.key === 'popularFlight') {
            navigate('/admins/statistics/popular-flight')
        } else if (e.key === 'ticketClassRevenue') {
            navigate('/admins/statistics/ticket-class-revenue')
        }
    }

    return (
        <>
            <div className='layout-content'>
                <Row className='ant-card ' gutter={[24, 0]} style={{ paddingBottom: 10, margin: '10px 2px 12px 2px' }}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode='horizontal'
                        items={items}
                        style={{ paddingTop: 10, width: '100%' }}
                    />
                </Row>
                <Content className='content-ant'>
                    <Outlet />
                </Content>
            </div>
        </>
    )
}

export default MainStatistics
