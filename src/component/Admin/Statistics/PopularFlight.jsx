import { useEffect, useState } from 'react'
import { Table, Row, Col, Button, DatePicker, Typography } from 'antd'
import { openNotification } from '../../../utils/Notification'
import { getListFlight } from '../../../services/apiAdmin'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'

const { RangePicker } = DatePicker
const { Text } = Typography

const PopularFlight = () => {
    const [listFight, setListFight] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const [totalCount, setTotalCount] = useState(0)
    const [sourceAirportId, setSourceAirportId] = useState(0)
    const [destinationAirportId, setDestinationAirportId] = useState(0)

    // eslint-disable-next-line no-unused-vars
    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current)
    }

    useEffect(() => {
        fechListFight()
    }, [currentPage, status])

    // eslint-disable-next-line no-unused-vars
    const onChangeSourceAirport = (value, label) => {
        setSourceAirportId(value)
    }

    // eslint-disable-next-line no-unused-vars
    const onDestinationAirport = (value, label) => {
        setDestinationAirportId(value)
    }
    const dataSource = listFight.map((item, index) => ({
        ...item,
        stt: index + currentPage * 10 - 9
    }))

    const fechListFight = async () => {
        const data = {
            page: currentPage,
            size: 10,
            sourceAirportId: sourceAirportId === 0 ? '' : sourceAirportId,
            destinationAirportId: destinationAirportId === 0 ? '' : destinationAirportId
        }
        try {
            let res = await getListFlight(status, data)
            setListFight(res.data.items)
            setTotalCount(res.data.totalCount)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 60,
            sorter: {
                compare: (a, b) => a.stt - b.stt,
                multiple: 1
            },
            align: 'center'
        },
        {
            title: 'ĐIỂM ĐI',
            dataIndex: 'destinationAirport?.city?.cityName',
            render: (value, _record) => {
                return _record?.sourceAirport?.city?.cityName
            },
            sorter: (a, b) => {
                return a.sourceAirport?.city?.cityName.localeCompare(b.sourceAirport?.city?.cityName)
            },
            width: 200
        },
        {
            title: 'ĐIỂM ĐẾN',
            dataIndex: 'to',
            render: (value, _record) => {
                return _record?.destinationAirport?.city?.cityName
            },
            sorter: (a, b) => {
                return a.destinationAirport?.city?.cityName.localeCompare(b.destinationAirport?.city?.cityName)
            },
            width: 200
        },

        {
            title: 'LOẠI',
            dataIndex: 'flightType',
            sorter: (a, b) => {
                return a.flightType.localeCompare(b.flightType)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return value === 'DOMESTIC' ? 'Nội địa' : 'Quốc tế'
            },
            width: 120
        },
        {
            title: 'DOANH THU',
            dataIndex: 'flightType',
            sorter: (a, b) => {
                return a.flightType.localeCompare(b.flightType)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return value === 'DOMESTIC' ? 'Nội địa' : 'Quốc tế'
            },
            width: 120
        },
        {
            title: 'TỔNG SỐ VÉ',
            dataIndex: 'flightType',
            sorter: (a, b) => {
                return a.flightType.localeCompare(b.flightType)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return value === 'DOMESTIC' ? 'Nội địa' : 'Quốc tế'
            },
            width: 120
        }
    ]

    const handleSearch = () => {
        fechListFight()
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: '20px', borderRadius: 12 }}
        >
            <Text className='titles-admin'>Danh Sách Chuyến Bay Phổ Biến</Text>
            <Row>
                <Col span={12}> </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end', marginBottom: 20 }}>
                    <LocaleProvider locale={locale}>
                        <RangePicker size='large' />
                    </LocaleProvider>
                    <Button className='btn-save' style={{ marginRight: 20, height: 50 }} onClick={() => handleSearch()}>
                        Tìm
                    </Button>
                </Col>
            </Row>

            <div className='table'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize: 10,
                        total: totalCount,
                        onChange: onChange
                    }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default PopularFlight
