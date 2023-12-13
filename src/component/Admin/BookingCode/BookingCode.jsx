import { useEffect, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, Menu, Tag, Select, Dropdown, Typography, DatePicker } from 'antd'
import { IconFilterFilled } from '@tabler/icons-react'

import { useNavigate } from 'react-router-dom'
import { openNotification } from '../../../utils/Notification'
import { CancelBooking, getBooking, getBookingById } from '../../../services/apiAdmin'
import { changeStatusAdmin, changeStatusBookingPayment } from '../../../utils/utils'
import { formatCurrency, formatDate, formatDateString } from '../../../utils/format'
import { getAirports } from '../../../services/apiAdmin'
import 'dayjs/locale/vi'
import { IconDotsVertical } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { setBookingById } from '../../../redux/reducers/Admin'

const { Text } = Typography
const itemss = [
    {
        label: 'Chỉnh Sửa',
        key: 'edit'
    }
]
const items = [
    {
        label: 'Tất Cả',
        key: 'all'
    }
]
const BookingCode = () => {
    const [listBooking, setListBooking] = useState([])
    const [listAirports, setListAirports] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, setTotalCount] = useState(0)
    const [status, setStatus] = useState('all')
    const [checkListBooking, setCheckListBooking] = useState([])
    const [sourceAirportId, setSourceAirportId] = useState(0)
    const [destinationAirportId, setDestinationAirportId] = useState(0)
    const [hidenSearch, setHidenSearch] = useState(false)
    const [departureDate, setDepartureDate] = useState('')
    const [arrivalDate, setArrivalDate] = useState('')
    const dispastch = useDispatch()
    // eslint-disable-next-line no-unused-vars
    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current)
    }
    console.log(listBooking)
    const navigate = useNavigate()
    useEffect(() => {
        fechListBooking()
    }, [currentPage])
    useEffect(() => {
        fechListAirports()
    }, [])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    // eslint-disable-next-line no-unused-vars
    const onChangeSourceAirport = (value, label) => {
        setSourceAirportId(value)
    }

    // eslint-disable-next-line no-unused-vars
    const onDestinationAirport = (value, label) => {
        setDestinationAirportId(value)
    }

    const onChangeDepartureDate = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onChangeArrivalDate = (dates, dateStrings) => {
        setArrivalDate(dateStrings)
    }

    const fechListBooking = async () => {
        const data = {
            page: currentPage,
            size: 10,
            bookingCode: textSearch,
            sourceAirportId: sourceAirportId === 0 ? '' : sourceAirportId,
            destinationAirportId: destinationAirportId === 0 ? '' : destinationAirportId,
            fromDate: formatDate(departureDate) === 'Invalid date' ? '' : formatDate(departureDate),
            toDate: formatDate(arrivalDate) === 'Invalid date' ? '' : formatDate(arrivalDate)
        }
        try {
            let res = await getBooking(status, data)
            setListBooking(res.data.items)
            setTotalCount(res.data.totalCount)
        } catch (e) {
            // openNotification('error', 'Thông báo', e.response.data.error.message)
            console.log(e)
        }
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setCheckListBooking(selectedRows)
        }
    }
    const dataSource = listBooking.map((item, index) => ({
        ...item,
        key: index + currentPage * 10 - 9
    }))
    const columns = [
        {
            title: 'MÃ ĐặT VÉ',
            dataIndex: 'bookingCode',
            sorter: (a, b) => {
                return a.bookingCode.localeCompare(b.bookingCode)
            }
        },
        {
            title: 'TỔNG TIỀN',
            dataIndex: 'amountTotal',
            sorter: {
                compare: (a, b) => a.amountTotal - b.amountTotal,
                multiple: 1
            },
            render: (value) => {
                return formatCurrency(value)
            },
            align: 'end'
        },
        {
            title: 'ĐIỂM ĐI',
            dataIndex: 'sourceAirport',
            render: (value, _record) => {
                return _record?.flightAway?.sourceAirport?.city?.cityName
            },
            sorter: (a, b) => {
                let nameA = a?.flightAway?.sourceAirport?.city?.cityName
                let nameB = b?.flightAway?.sourceAirport?.city?.cityName
                return nameA.localeCompare(nameB)
            },

            width: 200
        },
        {
            title: 'ĐIỂM ĐẾN',
            dataIndex: 'destinationAirport',
            render: (value, _record) => {
                return _record?.flightAway?.destinationAirport?.city?.cityName
            },
            sorter: (a, b) => {
                let nameA = a?.flightAway?.destinationAirport?.city?.cityName
                let nameB = b?.flightAway?.destinationAirport?.city?.cityName
                return nameA.localeCompare(nameB)
            },

            width: 200
        },

        {
            title: 'NGÀY ĐẶT',
            dataIndex: 'bookingDate',
            sorter: (a, b) => {
                return a.bookingDate.localeCompare(b.bookingDate)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return formatDateString(value)
            },

            align: 'center'
        },
        {
            title: 'Hạng Ghế',
            dataIndex: 'seat',
            sorter: (a, b) => {
                let nameA = a?.seat?.seatName
                let nameB = b?.seat?.seatName
                return nameA.localeCompare(nameB)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return _record?.seat?.seatName
            },
            align: 'center'
        },
        {
            title: 'LOẠI',
            dataIndex: 'journeyType',
            sorter: (a, b) => {
                return a.journeyType.localeCompare(b.journeyType)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return value === 'ONE_AWAY' ? 'Một Chiều' : 'Khứ Hồi'
            }
        },
        {
            title: 'THANH TOÁN',
            dataIndex: 'paymentStatus',
            render: (_, { paymentStatus }) => {
                const color = paymentStatus === 'SUCCESSFUL' ? 'green' : 'orange' // Determine color based on tag value
                return (
                    <Tag color={color} key={paymentStatus}>
                        {changeStatusBookingPayment(paymentStatus, 'vi')}
                    </Tag>
                )
            },
            align: 'center'
        },

        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            render: (_, { status }) => {
                const color = status === 'ACT' ? 'green' : status === 'PEN' ? 'orange' : 'orange' // Determine color based on tag value
                return (
                    <Tag color={color} key={status}>
                        {changeStatusAdmin(status, 'vi')}
                    </Tag>
                )
            },
            align: 'center'
        },
        {
            title: 'XỬ LÝ',
            key: 'id',
            render: (value, record) => (
                <Dropdown
                    menu={{
                        items: itemss.map((item, index) => ({
                            ...item,
                            key: item.key || index.toString()
                        })),

                        onClick: (e) => handleClickMe(record.id, record.bookingCode, e)
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space
                            style={{
                                paddingLeft: 10,
                                fontSize: 15,
                                fontWeight: 500,
                                color: '#006885'
                            }}
                        >
                            <IconDotsVertical />
                        </Space>
                    </a>
                </Dropdown>
            )
        }
    ]

    const [current, setCurrent] = useState('all')

    const onClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'all') {
            setStatus('all')
            setCurrentPage(1)
        } else if (e.key === 'act') {
            setStatus('act')
            setCurrentPage(1)
        } else if (e.key === 'pen') {
            setStatus('pen')
            setCurrentPage(1)
        }
    }

    const hanldeApply = () => {
        fechListBooking()
    }
    const idList = checkListBooking.map((booking) => booking.id)
    const bookingCodeList = checkListBooking.map((booking) => booking.bookingCode)
    const handleClickMe = async (id, code, e) => {
        if (e.key === 'edit') {
            try {
                let res = await getBookingById(id)
                dispastch(setBookingById(res.data))
                navigate('/admins/booking/edit')
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        }
    }
    const handleSearch = () => {
        fechListBooking()
    }
    const handleCancel = async () => {
        if (idList.length === 0) {
            openNotification('error', 'Thông báo', `Bạn chưa chọn mã đặt vé để hủy`)
            return
        }
        let data = {
            ids: idList
        }
        try {
            await CancelBooking(data)
            fechListBooking()
            openNotification('success', 'Thông báo', `Đã Hủy Mã Đặt Vé ${bookingCodeList}`)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: '20px', borderRadius: 12 }}
        >
            <Text className='titles-admin'>Danh Sách Mã Đặt Vé</Text>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ paddingTop: 10 }}
            />
            <Row>
                <Col span={12}>
                    <Button className='btn-create' onClick={() => handleCancel()}>
                        Hủy
                    </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                    <div>
                        <Space>
                            <IconFilterFilled className='icon-filter' onClick={() => setHidenSearch(!hidenSearch)} />
                        </Space>
                    </div>
                    <Input
                        className='input-search'
                        placeholder='Nhập Mã Đặt Vé'
                        onChange={(event) => setTextSearch(event.target.value)}
                        style={{ marginTop: 10 }}
                    />

                    <Button
                        className='btn-save'
                        style={{ marginTop: 10, marginRight: 20 }}
                        onClick={() => handleSearch()}
                    >
                        Lưu
                    </Button>
                </Col>
            </Row>
            {hidenSearch === true ? (
                <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginLeft: 30 }}>
                    <Col span={6}>
                        {' '}
                        <Select
                            showSearch
                            placeholder='Chọn điểm đi'
                            style={{ width: '90%' }}
                            onChange={onChangeSourceAirport}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {listAirports.map((item) => (
                                // eslint-disable-next-line react/jsx-no-undef
                                <Option key={item.id} value={item.id} label={item?.city?.cityName}>
                                    <>
                                        <Row className='text-cityname'>
                                            {item.city.cityName} ({item.airportCode})- {item.airportName}
                                        </Row>
                                    </>
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={6}>
                        {' '}
                        <Select
                            showSearch
                            placeholder='Chọn điểm đến'
                            style={{ width: '90%' }}
                            onChange={onDestinationAirport}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {listAirports.map((item) => (
                                // eslint-disable-next-line react/jsx-no-undef
                                <Option key={item.id} value={item.id} label={item?.city?.cityName}>
                                    <>
                                        <Row className='text-cityname'>
                                            {item.city.cityName} ({item.airportCode})- {item.airportName}
                                        </Row>
                                    </>
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <DatePicker
                            style={{ width: '90%' }}
                            placeholder={'Từ Ngày'}
                            onChange={onChangeDepartureDate}
                            format='DD/MM/YYYY'
                        />
                    </Col>
                    <Col span={4}>
                        <DatePicker
                            style={{ width: '90%' }}
                            placeholder={'Đến Ngày'}
                            format='DD/MM/YYYY'
                            onChange={onChangeArrivalDate}
                        />
                    </Col>
                    <Col span={4}>
                        <Button className='btn-apply' onClick={() => hanldeApply()}>
                            Áp Dụng
                        </Button>
                    </Col>
                </Row>
            ) : (
                ''
            )}

            <div className='table'>
                <Table
                    rowSelection={{
                        ...rowSelection
                    }}
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

export default BookingCode
