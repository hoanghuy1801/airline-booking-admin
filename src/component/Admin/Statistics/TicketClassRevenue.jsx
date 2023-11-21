import { useEffect, useState } from 'react'

import { Button, Card, Col, DatePicker, Progress, Row, Typography } from 'antd'
import LocaleProvider from 'antd/es/locale'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import { getRevenueInTwoYear, statisticalRevenueSeat } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import { formatCurrency } from '../../../utils/format'

const { RangePicker } = DatePicker
const TicketClassRevenue = () => {
    const { Title } = Typography
    const currentYear = new Date().getFullYear()
    const firstDayOfYear = new Date(currentYear, 0, 1)
    const lastDayOfYear = new Date(currentYear, 11, 31)
    const formattedFirstDay = firstDayOfYear.toLocaleDateString('en-CA')
    const formattedLastDay = lastDayOfYear.toLocaleDateString('en-CA')
    const [listRevenueSeat, setListRevenueSeat] = useState([])
    const [fromDate, setFromDate] = useState(formattedFirstDay)
    const [toDate, setToDate] = useState(formattedLastDay)
    useEffect(() => {
        fechHome()
    }, [])
    const fechHome = async () => {
        let data = {
            fromDate: fromDate,
            toDate: toDate
        }
        try {
            let r = await statisticalRevenueSeat(data)
            setListRevenueSeat(r.data)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const handleDateRangeChange = (dates, dateStrings) => {
        setFromDate(dateStrings[0])
        setToDate(dateStrings[1])
    }
    const hanldeApply = () => {
        fechHome()
    }
    console.log('listRevenueSeat', listRevenueSeat)
    const totalBooking = listRevenueSeat.reduce((acc, item) => acc + +item.totalBooking, 0)
    const totalAmount = listRevenueSeat.reduce((acc, item) => acc + item.amountTotal, 0)
    console.log('totalBooking', (Number(listRevenueSeat[0]?.totalBooking) / totalBooking) * 100)
    console.log('totalAmount', totalAmount)
    const list = listRevenueSeat.map((listRevenueSeat, index) => ({
        Title: `${listRevenueSeat?.seatName} - ${listRevenueSeat?.seatClass}`,
        total: `${formatCurrency(listRevenueSeat?.amountTotal)}`,
        ratioAmount: <Progress percent={Math.round((listRevenueSeat?.amountTotal / totalAmount) * 100)} size='small' />,
        totalQuantity: `${listRevenueSeat?.totalBooking}`,
        ratioQuantity: <Progress percent={(Number(listRevenueSeat?.totalBooking) / totalBooking) * 100} size='small' />
    }))

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
                            <RangePicker size='large' onChange={handleDateRangeChange} />
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
                                            <th style={{ width: '500px' }}>HẠNG VÉ</th>
                                            <th style={{ width: '300px' }}>DOANH THU</th>
                                            <th style={{ width: '250px' }}>TỈ LỆ DOANH THU</th>
                                            <th style={{ display: 'flex', justifyContent: 'center' }}>SỐ LƯỢNG VÉ</th>
                                            <th style={{ width: '250px' }}>TỈ LỆ VÉ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((d, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <h6>{d.Title}</h6>
                                                </td>
                                                <td>
                                                    <h6>{d.total}</h6>
                                                </td>
                                                <td>
                                                    <span className='text-xs font-weight-bold'>{d.ratioAmount} </span>
                                                </td>
                                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h6>{d.totalQuantity}</h6>
                                                </td>
                                                <td>
                                                    <span className='text-xs font-weight-bold'>{d.ratioQuantity} </span>
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
