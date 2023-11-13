import { useEffect, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, DatePicker, Menu, Tag, Select, Dropdown } from 'antd'
import { IconFilterFilled } from '@tabler/icons-react'
import './ListFlight.css'
import { useNavigate } from 'react-router-dom'
import { openNotification } from '../../../utils/Notification'
import { changeStatusFlight, getFlightId, getListFlight } from '../../../services/apiAdmin'
import { changeStatusAdmin } from '../../../utils/utils'
import { formatDate, formatDateString, formatTimeHHMM } from '../../../utils/format'
import { getAirports } from '../../../services/apiAdmin'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
import { IconDotsVertical } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { setFlightById } from '../../../redux/reducers/Admin'

const itemss = [
    {
        label: 'Hoạt động',
        key: 'act'
    },
    {
        type: 'divider'
    },
    {
        label: 'Tạm ngưng',
        key: 'pen'
    },
    {
        type: 'divider'
    },
    {
        label: 'Chỉnh sửa',
        key: 'edit'
    }
]
const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Hoạt động',
        key: 'act'
    },
    {
        label: 'Tạm ngưng',
        key: 'pen'
    }
]
const ListFlight = () => {
    const [listFight, setListFight] = useState([])
    const [listAirports, setListAirports] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, setTotalCount] = useState(0)
    const [status, setStatus] = useState('all')
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
        fechListFight()
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
    const dataSource = listFight.map((item, index) => ({
        ...item,
        stt: index + currentPage * 10 - 9
    }))
    const fechListFight = async () => {
        const data = {
            page: currentPage,
            size: 10,
            searchText: textSearch,
            sourceAirportId: sourceAirportId === 0 ? '' : sourceAirportId,
            destinationAirportId: destinationAirportId === 0 ? '' : destinationAirportId,
            departureDate: formatDate(departureDate) === 'Invalid date' ? '' : formatDate(departureDate),
            arrivalDate: formatDate(arrivalDate) === 'Invalid date' ? '' : formatDate(arrivalDate)
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
            width: 70,
            sorter: {
                compare: (a, b) => a.stt - b.stt,
                multiple: 1
            }
        },
        {
            title: 'TÊN CHUYẾN BAY',
            dataIndex: 'flightCode',
            sorter: (a, b) => {
                return a.flightCode.localeCompare(b.flightCode)
            },
            width: 180
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
            title: 'NGÀY CẤT CÁNH',
            dataIndex: 'departureTime',
            sorter: (a, b) => {
                return a.departureTime.localeCompare(b.departureTime)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return formatTimeHHMM(value)
            },
            width: 200
        },
        {
            title: 'NGÀY HẠ CÁCH',
            dataIndex: 'arrivalTime',
            sorter: (a, b) => {
                return a.arrivalTime.localeCompare(b.arrivalTime)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return formatTimeHHMM(value)
            },
            width: 200
        },
        {
            title: 'NGÀY TẠO',
            dataIndex: 'createdAt',
            sorter: (a, b) => {
                return a.createdAt.localeCompare(b.createdAt)
            },
            // eslint-disable-next-line no-unused-vars
            render: (value, _record) => {
                return formatDateString(value)
            },
            width: 170
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
            width: 150
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
    // eslint-disable-next-line no-unused-vars
    const onSearch = (value, _e, info) => {
        setTextSearch(value)
    }
    const onChangeDepartureDate = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onChangeArrivalDate = (dates, dateStrings) => {
        setArrivalDate(dateStrings)
    }
    const hanldeApply = () => {
        fechListFight()
    }
    const handleClickMe = async (id, code, e) => {
        if (e.key === 'act') {
            try {
                await changeStatusFlight(id, 'ACT')
                fechListFight()
                openNotification('success', 'Thông báo', `Đã Hoạt Động Chuyến bay ${code}`)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        } else if (e.key === 'pen') {
            try {
                await changeStatusFlight(id, 'PEN')
                fechListFight()
                openNotification('success', 'Thông báo', `Đã Tạm Ngưng Chuyến bay ${code}`)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        } else if (e.key === 'edit') {
            try {
                let res = await getFlightId(id)
                dispastch(setFlightById(res.data))
                navigate('/admins/flight/edit')
            } catch (error) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        }
    }
    const handleSearch = () => {
        fechListFight()
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <p className='title-admin'>Danh Sách Chuyến Bay</p>
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
                        Thêm
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
                        placeholder='Nhập tên chuyến bay'
                        onSearch={onSearch}
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
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize: 10,
                        total: totalCount,
                        onChange: onChange
                    }}
                    scroll={{
                        y: 540
                    }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default ListFlight
