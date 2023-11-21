import { useEffect, useState } from 'react'

import { Button, Card, Col, DatePicker, Row } from 'antd'
import LocaleProvider from 'antd/es/locale'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import { statisticalTotalBooking } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import LineChartStatistics from './LineChartStatistics'
const TicketSales = () => {
    const [listStatisticalTotalBooking, setListStatisticalTotalBooking] = useState([])
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    useEffect(() => {
        fechHome()
    }, [])
    const fechHome = async () => {
        let data = {
            year: year
        }
        try {
            let r = await statisticalTotalBooking(data)
            setListStatisticalTotalBooking(r.data)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const handleDatePickerChange = (date, dateString) => {
        setYear(dateString)
    }
    const hanldeApply = () => {
        fechHome()
    }
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
                            <DatePicker
                                picker='year'
                                placeholder='Chọn Năm'
                                size='large'
                                style={{ width: '90%' }}
                                onChange={handleDatePickerChange}
                            />
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
                        <Card bordered={false} className='criclebox h-full'>
                            <LineChartStatistics
                                listStatisticalTotalBooking={listStatisticalTotalBooking}
                                year={year}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TicketSales
