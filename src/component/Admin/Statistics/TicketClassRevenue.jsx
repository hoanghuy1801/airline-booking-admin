import { useEffect, useState } from 'react'

import { Button, Card, Col, DatePicker, Progress, Row, Typography } from 'antd'
import LocaleProvider from 'antd/es/locale'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import { getRevenueInTwoYear } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'

const { RangePicker } = DatePicker
const TicketClassRevenue = () => {
    const { Title } = Typography
    const [listRevenueInTwoYear, setListRevenueInTwoYear] = useState([])
    useEffect(() => {
        fechHome()
    }, [])
    const fechHome = async () => {
        try {
            let r = await getRevenueInTwoYear()
            setListRevenueInTwoYear(r.data)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }

    const hanldeApply = () => {
        // fechListFight()
    }
    const list = [
        {
            Title: 'Soft UI Shopify Version',
            bud: '$14,000',
            progress: <Progress percent={60} size='small' />
        },
        {
            Title: 'Progress Track',
            bud: '$3,000',
            progress: <Progress percent={10} size='small' />
        },
        {
            Title: 'Fix Platform Errors',
            bud: 'Not Set',
            progress: <Progress percent={100} size='small' status='active' />
        }
    ]
    return (
        <>
            <div className='layout-content'>
                <Row
                    className='ant-card '
                    gutter={[24, 0]}
                    style={{ margin: '10px 2px 12px 2px', padding: '17px 0px 17px 10px' }}
                >
                    {' '}
                    <Col span={6}>
                        <LocaleProvider locale={locale}>
                            <RangePicker size='large' />
                        </LocaleProvider>
                    </Col>
                    <Col span={4}>
                        <Button className='btn-apply' onClick={() => hanldeApply()}>
                            Áp Dụng
                        </Button>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className='mb-24'>
                        <Card bordered={false} className='criclebox cardbody h-full'>
                            <div className='project-ant'>
                                <div>
                                    <Title level={5}>Doanh Thu Hạng Vé</Title>
                                </div>
                            </div>
                            <div className='ant-list-box table-responsive'>
                                <table className='width-100'>
                                    <thead>
                                        <tr>
                                            <th>HẠNG VÉ</th>
                                            <th>DOANH THU</th>
                                            <th>TỈ LỆ DOANH THU</th>
                                            <th>SỐ LƯỢNG VÉ</th>
                                            <th>TỈ LỆ VÉ</th>
                                            <th>TỪ NGÀY</th>
                                            <th>ĐẾN NGÀY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((d, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <h6>
                                                        <img src={d.img} alt='' className='avatar-sm mr-10' /> {d.Title}
                                                    </h6>
                                                </td>
                                                <td>{d.member}</td>
                                                <td>
                                                    <span className='text-xs font-weight-bold'>{d.bud} </span>
                                                </td>
                                                <td>
                                                    <div className='percent-progress'>{d.progress}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TicketClassRevenue
