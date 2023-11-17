import { useEffect, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, DatePicker, Menu, Tag, Select, Dropdown, Typography } from 'antd'
import { IconFilterFilled } from '@tabler/icons-react'

import { useNavigate } from 'react-router-dom'
import { openNotification } from '../../../utils/Notification'
import { CancelBooking, getBooking } from '../../../services/apiAdmin'
import { changeStatusAdmin, changeStatusBookingPayment } from '../../../utils/utils'
import { formatCurrency, formatDateString, formatTimeHHMM } from '../../../utils/format'
import { getAirports } from '../../../services/apiAdmin'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
import { IconDotsVertical } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'

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
    },
    {
        label: 'Hoạt Động',
        key: 'act'
    },
    {
        label: 'Đã Hủy',
        key: 'pen'
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

    const navigate = useNavigate()
    useEffect(() => {
        fechListBooking()
    }, [currentPage, status, textSearch])
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

    const fechListBooking = async () => {
        const data = {
            page: currentPage,
            size: 10,
            bookingCode: textSearch
            // sourceAirportId: sourceAirportId === 0 ? '' : sourceAirportId,
            // destinationAirportId: destinationAirportId === 0 ? '' : destinationAirportId,
            // departureDate: formatDate(departureDate) === 'Invalid date' ? '' : formatDate(departureDate),
            // arrivalDate: formatDate(arrivalDate) === 'Invalid date' ? '' : formatDate(arrivalDate)
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

                        onClick: (e) => handleClickMe(record.id, record.flightCode, e)
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

    const onChangeDepartureDate = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onChangeArrivalDate = (dates, dateStrings) => {
        setArrivalDate(dateStrings)
    }
    const hanldeApply = () => {
        //fechListFight()
    }
    const idList = checkListBooking.map((booking) => booking.id)
    const bookingCodeList = checkListBooking.map((booking) => booking.bookingCode)
    const handleClickMe = async (id, code, e) => {}
    const handleSearch = () => {
        // fechListFight()
    }
    const handleCancel = async () => {
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
                    <Button className='btn-create' onClick={() => navigate('/admins/flight/create')}>
                        Đặt Vé
                    </Button>
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
                <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <Col span={4}>
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
                                            {item.city.cityName} ({item.airportCode})
                                        </Row>
                                        <Row>
                                            <Col span={18} className='text-airportname'>
                                                {item.airportName}
                                            </Col>
                                        </Row>
                                    </>
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
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
                                            {item.city.cityName} ({item.airportCode})
                                        </Row>
                                        <Row>
                                            <Col span={18} className='text-airportname'>
                                                {item.airportName}
                                            </Col>
                                        </Row>
                                    </>
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <LocaleProvider locale={locale}>
                            <DatePicker
                                style={{ width: '90%' }}
                                placeholder={'Ngày cất cách'}
                                onChange={onChangeDepartureDate}
                                format='DD/MM/YYYY'
                            />
                        </LocaleProvider>
                    </Col>
                    <Col span={4}>
                        <LocaleProvider locale={locale}>
                            <DatePicker
                                style={{ width: '90%' }}
                                placeholder={'Ngày hạ cánh'}
                                format='DD/MM/YYYY'
                                onChange={onChangeArrivalDate}
                            />
                        </LocaleProvider>
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
