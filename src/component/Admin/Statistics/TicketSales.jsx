import { useEffect, useState } from 'react'

import { Button, Card, Col, DatePicker, Row } from 'antd'
import LocaleProvider from 'antd/es/locale'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import { getRevenueInTwoYear } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import LineChartStatistics from './LineChartStatistics'
const TicketSales = () => {
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
                            <DatePicker picker='year' placeholder='Chọn Năm' size='large' style={{ width: '90%' }} />
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
                            <LineChartStatistics listRevenueInTwoYear={listRevenueInTwoYear} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TicketSales
