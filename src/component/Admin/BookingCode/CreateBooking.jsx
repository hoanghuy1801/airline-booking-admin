import { Button, Col, DatePicker, InputNumber, Radio, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { getAirports, getListFlight, getListFlightBooking, getTickets } from '../../../services/apiAdmin'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
import moment from 'moment'
import { openNotification } from '../../../utils/Notification'
import { formatCurrency, formatDate } from '../../../utils/format'
const { Text } = Typography
const { RangePicker } = DatePicker
const disabledDate = (current) => {
    // Lấy ngày hiện tại
    const today = moment().startOf('day')
    // Nếu ngày hiện tại lớn hơn hoặc bằng ngày đang xét thì vô hiệu hóa
    return current && current < today
}
const CreateBooking = () => {
    const navigate = useNavigate()
    const [listFlight, setListFlight] = useState([])
    const [listFlightReturn, setListFlightReturn] = useState([])
    const [selectedDates, setSelectedDates] = useState([])
    const [listSeats, setListSeats] = useState([])
    const [roundTrip, setRoundTrip] = useState(false)
    const [listAirports, setListAirports] = useState([])
    const [value, setValue] = useState(1)
    const [destinationAirportCity, setDestinationAirportCity] = useState()
    const [sourceAirportCity, setSourceAirportCity] = useState()
    const [sourceAirport, setSourceAirport] = useState()
    const [destinationAirport, setDestinationAirport] = useState()
    const [departureDate, setDepartureDate] = useState()
    const [returnDate, setReturnDate] = useState()
    const [seatId, setSeatId] = useState()
    const [seatClass, setSeatClass] = useState()
    const [adult, setAdult] = useState(1)
    const [children, setChildren] = useState(0)
    const [baby, setBaby] = useState(0)
    const [hidenListFlight, setHidenSearchListFlight] = useState(false)
    const maxPeople = 9
    useEffect(() => {
        fechListAirports()
        fechListTickets()
    }, [])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const fechListTickets = async () => {
        let res = await getTickets()
        if (res.status == 200) {
            setListSeats(res.data)
        }
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onChangeSourceAirport = (value, label) => {
        setSourceAirportCity(label.label)
        setSourceAirport(value)
    }

    const onDestinationAirport = (value, label) => {
        setDestinationAirport(value)
        setDestinationAirportCity(label.label)
    }
    const handleDateChange = (dates, dateStrings) => {
        setReturnDate(dateStrings[1])
        setDepartureDate(dateStrings[0])
        setSelectedDates(dates)
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onSeatClass = (value, label) => {
        setSeatId(value)
        setSeatClass(label.label)
    }
    const handleAdultChange = (value) => {
        if (value + children <= maxPeople) {
            setAdult(value)
        }
    }

    const handleChildrenChange = (value) => {
        if (adult + value <= maxPeople) {
            setChildren(value)
        }
    }
    const handleSearch = async () => {
        if (
            sourceAirport === undefined ||
            destinationAirport === undefined ||
            departureDate === undefined ||
            seatId === undefined
        ) {
            openNotification('warning', 'Thông báo', 'Bạn Chưa Nhập Đủ Thông Tin')
            return
        }
        let data = {
            sourceAirportId: sourceAirport,
            destinationAirportId: destinationAirport,
            departureDate: formatDate(departureDate),
            seatId: seatId,
            numAdults: adult,
            numChildren: children,
            numInfants: baby
        }
        try {
            const res = await getListFlightBooking(data)
            setListFlight(res.data)
            setHidenSearchListFlight(true)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
        //return
        if (roundTrip) {
            if (
                sourceAirport === undefined ||
                destinationAirport === undefined ||
                departureDate === undefined ||
                seatId === undefined ||
                returnDate === undefined
            ) {
                openNotification('warning', 'Thông báo', 'Bạn Chưa Nhập Đủ Thông Tin')
                return
            }

            let data = {
                sourceAirportId: sourceAirport,
                destinationAirportId: destinationAirport,
                departureDate: formatDate(returnDate),
                seatId: seatId,
                numAdults: adult,
                numChildren: children,
                numInfants: baby
            }
            try {
                const res = await getListFlightBooking(data)
                setListFlightReturn(res.data)
                setHidenSearchListFlight(true)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        }
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: '20px', borderRadius: 12 }}
        >
            <Text className='titles-admin'>Đặt Vé</Text>
            <Row>
                <Radio.Group
                    onChange={onChange}
                    value={value}
                    className='radio'
                    style={{ fontSize: 14, fontWeight: 500, marginBottom: 20, marginTop: 30 }}
                >
                    <Radio value={1} onClick={() => setRoundTrip(false)}>
                        Một Chiều
                    </Radio>
                    <Radio value={2} onClick={() => setRoundTrip(true)}>
                        Khứ Hồi
                    </Radio>
                </Radio.Group>
            </Row>
            <Row>
                <Col span={6}>
                    <Select
                        showSearch
                        style={{ width: '90%' }}
                        placeholder='Điểm Đi'
                        onChange={onChangeSourceAirport}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {listAirports.map((item) => (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Option key={item.id} value={item.id} label={item.city.cityName}>
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
                    <Select
                        showSearch
                        style={{ width: '90%' }}
                        placeholder='Điểm Đến'
                        onChange={onDestinationAirport}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {listAirports.map((item) => (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Option key={item.id} value={item.id} label={item.city.cityName}>
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
                    <LocaleProvider locale={locale}>
                        {roundTrip ? (
                            <RangePicker
                                style={{ width: '90%' }}
                                placeholder={['Ngày Đi', 'Ngày Về']}
                                disabledDate={disabledDate}
                                value={selectedDates}
                                onChange={handleDateChange}
                                format='DD/MM/YYYY'
                            />
                        ) : (
                            <>
                                <DatePicker
                                    onChange={onChangeDatePicker}
                                    style={{ width: '90%' }}
                                    placeholder='Ngày Đi'
                                    disabledDate={disabledDate}
                                    format='DD/MM/YYYY'
                                />
                            </>
                        )}
                    </LocaleProvider>
                </Col>
                <Col span={6}>
                    <Select
                        showSearch
                        style={{ width: '90%' }}
                        placeholder='Hạng Ghế'
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={onSeatClass}
                    >
                        {listSeats.map((item) => (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Option key={item.id} value={item.id} label={item.seatClass}>
                                <Row>{item.seatName}</Row>
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Col span={3} style={{ paddingTop: 10 }}>
                    <label style={{ marginRight: 20, fontSize: 14, fontWeight: 500 }}>Người Lớn:</label>
                    <InputNumber min={1} max={maxPeople} defaultValue={1} onChange={handleAdultChange} value={adult} />
                </Col>
                <Col span={3} style={{ paddingTop: 10 }}>
                    <label style={{ marginRight: 20, fontSize: 14, fontWeight: 500 }}>Trẻ Em:</label>
                    <InputNumber
                        min={0}
                        max={maxPeople}
                        defaultValue={0}
                        onChange={handleChildrenChange}
                        value={children}
                    />
                </Col>
                <Col span={3} style={{ paddingTop: 10 }}>
                    <label style={{ marginRight: 20, fontSize: 14, fontWeight: 500 }}>Em Bé:</label>
                    <InputNumber min={0} max={adult} defaultValue={0} onChange={(value) => setBaby(value)} />
                </Col>
                <Col span={4} style={{ paddingTop: 6 }}>
                    <Button
                        style={{
                            backgroundColor: '#006885',
                            color: 'white',
                            fontWeight: 500,
                            fontSize: 15,
                            width: 100
                        }}
                        onClick={() => handleSearch()}
                    >
                        Tìm
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Select
                        showSearch
                        style={{ width: '90%' }}
                        placeholder='Chọn Chuyến Đi'
                        //  onChange={onDestinationAirport}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {listFlight.map((item) => (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Option key={item.id} value={item.id} label={item.flightCode}>
                                <>
                                    <Row className='text-cityname'>
                                        {item?.flightCode} --- {formatCurrency(item?.flightSeatPrice?.adultPrice)}
                                    </Row>
                                </>
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </div>
    )
}

export default CreateBooking
