/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import imgcreateFlight from '../../../assets/admin/createFlight.png'
import { useNavigate } from 'react-router-dom'
import { createFlight, getAirports, getListAircraft } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import moment from 'moment/moment'
import { convertToReactJS } from '../../../utils/utils'
const { RangePicker } = DatePicker
const { Text } = Typography
const disabledDate = (current) => {
    // Lấy ngày hiện tại
    const today = moment().startOf('day')
    // Nếu ngày hiện tại lớn hơn hoặc bằng ngày đang xét thì vô hiệu hóa
    return current && current < today
}
const CreateFlight = () => {
    const [listAirports, setListAirports] = useState([])
    const [listAircraft, setListAircraft] = useState([])
    const [sourceAirportId, setSourceAirportId] = useState(0)
    const [destinationAirportId, setDestinationAirportId] = useState(0)
    const [departureDate, setDepartureDate] = useState(0)
    const [arrivalDate, setArrivalDate] = useState(0)
    const [aircraftId, setArcraftId] = useState(0)
    const [flightType, setFlightType] = useState('DOMESTIC')
    const [seatPriceECONOMY, setSeatPriceCONOMY] = useState(0)
    const [seatPricePREMIUM_ECONOMY, setSeatPricePREMIUM_ECONOMY] = useState(0)
    const [seatPriceBUSINESS, setSeatPriceBUSINESS] = useState(0)
    useEffect(() => {
        fechListAirports()
    }, [])
    useEffect(() => {
        fechListAircraft()
    }, [sourceAirportId, destinationAirportId, departureDate, arrivalDate])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const fechListAircraft = async () => {
        let data = {
            sourceAirportId: sourceAirportId,
            destinationAirportId: destinationAirportId,
            departureTime: departureDate,
            arrivalTime: arrivalDate
        }
        let res = await getListAircraft(data)
        if (res.status == 200) {
            setListAircraft(res.data)
        }
    }
    const [form] = Form.useForm()

    const navigate = useNavigate()
    const onChangeSourceAirport = (value, label) => {
        setSourceAirportId(value)
    }

    const onDestinationAirport = (value, label) => {
        setDestinationAirportId(value)
    }
    const onAircraft = (value, label) => {
        setArcraftId(value)
    }
    const onFlightType = (value, label) => {
        setFlightType(value)
    }

    const onOk = (value) => {
        setDepartureDate(value[0]?.$d)
        setArrivalDate(value[1]?.$d)
    }

    const handleContinue = async () => {
        const data = {
            sourceAirportId: sourceAirportId,
            destinationAirportId: destinationAirportId,
            aircraftId: aircraftId,
            departureTime: departureDate,
            arrivalTime: arrivalDate,
            flightType: flightType,
            flightSeatPrices: [
                {
                    seatId: '94773356-7b49-4dd6-9ba9-0d8ac3f545fd',
                    seatPrice: seatPriceECONOMY
                },
                {
                    seatId: '6c6f442c-f8c3-45c9-807e-9b1c15de9c85',
                    seatPrice: seatPricePREMIUM_ECONOMY
                },
                {
                    seatId: '2ce8e277-54ad-47e2-86e5-e14dc84b2f1b',
                    seatPrice: seatPriceBUSINESS
                }
            ]
        }
        try {
            if (sourceAirportId === destinationAirportId) {
                openNotification('warning', 'Thông báo', 'Nơi đi nơi đến không thể là một')
                return
            }
            if (
                sourceAirportId === 0 ||
                destinationAirportId === 0 ||
                aircraftId === 0 ||
                departureDate === 0 ||
                arrivalDate === 0 ||
                seatPriceECONOMY === 0 ||
                seatPricePREMIUM_ECONOMY === 0 ||
                seatPriceBUSINESS === 0
            ) {
                openNotification('warning', 'Thông báo', 'Bạn chưa nhập đủ thông tin')
                return
            }

            await createFlight(data)
            openNotification('success', 'Thông báo', 'Thêm chuyến bay thành công')
            navigate('/admins/flight')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString)
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='title-admin'>Thêm chuyến bay</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/flight')}>
                    Hủy
                </Button>
                <Button className='btn-save' onClick={() => handleContinue()}>
                    Lưu
                </Button>
            </Row>
            <Row>
                <Col span={8}>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                        <img src={imgcreateFlight} style={{ height: 200 }} />
                    </div>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item name='From' label='Điểm đi'>
                            <Select
                                showSearch
                                style={{ width: '90%' }}
                                onChange={onChangeSourceAirport}
                                size='large'
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item?.city?.cityName}>
                                        <>
                                            <Row className='text-cityname'>
                                                {item.city.cityName} ({item.airportCode})- {item.airportName}
                                            </Row>
                                        </>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Điểm đến'>
                            <Select
                                showSearch
                                style={{ width: '90%' }}
                                onChange={onDestinationAirport}
                                size='large'
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.city.cityName}>
                                        <>
                                            <Row className='text-cityname'>
                                                {item.city.cityName} ({item.airportCode})- {item.airportName}
                                            </Row>
                                        </>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Ngày giờ cất hạ cánh:'>
                            <RangePicker
                                placeholder={['Ngày giờ cất cánh', 'Ngày giờ hạ cánh']}
                                showTime={{
                                    format: 'HH:mm'
                                }}
                                style={{
                                    width: '90%'
                                }}
                                disabledDate={disabledDate}
                                format='HH:mm DD/MM/YYYY '
                                onChange={onChange}
                                onOk={onOk}
                                size='large'
                            />
                        </Form.Item>
                        <Form.Item name='status' label='Máy bay chở khách:'>
                            <Select
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                onChange={onAircraft}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAircraft.map((item) => (
                                    <Option
                                        key={item.id}
                                        value={item.id}
                                        label={item?.aircraftCode}
                                        defaultValue={listAircraft[0]?.aircraftCode}
                                    >
                                        <>
                                            <Row className='text-cityname'>{item?.aircraftCode}</Row>
                                        </>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Loại:'>
                            <Select
                                defaultValue='DOMESTIC'
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                onChange={onFlightType}
                                options={[
                                    {
                                        value: 'DOMESTIC',
                                        label: 'Nội địa'
                                    },
                                    {
                                        value: 'INTERNATIONAL',
                                        label: 'Quốc tế'
                                    }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Giá Vé Phổ Thông:'
                            onChange={(event) => setSeatPriceCONOMY(event.target.value)}
                        >
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                size='small'
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Giá vé phổ thông đặc biệt:'
                            onChange={(event) => setSeatPricePREMIUM_ECONOMY(event.target.value)}
                        >
                            <Input
                                style={{
                                    width: '90%',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                                size='small'
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Giá vé thương gia'
                            onChange={(event) => setSeatPriceBUSINESS(event.target.value)}
                        >
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                size='small'
                                suffix='VND'
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default CreateFlight
