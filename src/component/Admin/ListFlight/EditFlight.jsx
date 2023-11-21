/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import imgcreateFlight from '../../../assets/admin/editFlight.jpg'
import { useNavigate } from 'react-router-dom'
import { getAirports } from '../../../services/apiAdmin'
import { createFlight, editFlight, getListAircraft } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import { useSelector } from 'react-redux'

const { Text } = Typography

const EditFlight = () => {
    const flightById = useSelector((state) => state.Admin.flightById)
    const [listAirports, setListAirports] = useState([])
    const [listAircraft, setListAircraft] = useState([])
    const [departureDate, setDepartureDate] = useState(flightById?.departureTime)
    const [arrivalDate, setArrivalDate] = useState(flightById?.arrivalTime)
    const [aircraftId, setArcraftId] = useState(flightById?.aircraft?.id)
    const [flightType, setFlightType] = useState(flightById?.flightType)
    const [seatPriceECONOMY, setSeatPriceCONOMY] = useState(flightById?.flightSeatPrices[0]?.adultPrice)
    const [seatPricePREMIUM_ECONOMY, setSeatPricePREMIUM_ECONOMY] = useState(
        flightById?.flightSeatPrices[2]?.adultPrice
    )
    const [seatPriceBUSINESS, setSeatPriceBUSINESS] = useState(flightById?.flightSeatPrices[1]?.adultPrice)
    useEffect(() => {
        fechListAirports()
    }, [])
    useEffect(() => {
        fechListAircraft()
    }, [departureDate, arrivalDate])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const fechListAircraft = async () => {
        let data = {
            departureDate: departureDate,
            arrivalDate: arrivalDate
        }
        let res = await getListAircraft()
        if (res.status == 200) {
            setListAircraft(res.data)
        }
    }
    const [form] = Form.useForm()

    const navigate = useNavigate()
    const onAircraft = (value, label) => {
        setArcraftId(value)
    }

    const onOk = (value) => {
        setDepartureDate(value?.$d)
    }
    const onOksetArrivalDate = (value) => {
        setArrivalDate(value?.$d)
    }
    const handleContinue = async () => {
        const data = {
            aircraftId: aircraftId,
            departureTime: departureDate,
            arrivalTime: arrivalDate,
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
            await editFlight(flightById?.id, data)
            openNotification('success', 'Thông báo', 'Sửa thông tin thành công')
            navigate('/admins/flight/listflight')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }

    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='title-admin'>Thông Tin Chuyến bay</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/flight/listflight')}>
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
                        <Form.Item name='From' label='Điểm đến:'>
                            <Select
                                showSearch
                                disabled
                                size='large'
                                defaultValue={flightById?.sourceAirport?.id}
                                style={{ width: '90%' }}
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
                        <Form.Item label='Điểm đi'>
                            <Select
                                showSearch
                                disabled
                                size='large'
                                defaultValue={flightById?.destinationAirport?.id}
                                style={{ width: '90%' }}
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
                        <Form.Item label='Ngày giờ cất cánh:'>
                            <DatePicker
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                showTime
                                onOk={onOk}
                                format='HH:mm DD/MM/YYYY '
                            />
                        </Form.Item>
                        <Form.Item label=' Ngày giờ hạ cánh:'>
                            <DatePicker
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                showTime
                                onOk={onOksetArrivalDate}
                                format='HH:mm DD/MM/YYYY '
                            />
                        </Form.Item>
                        <Form.Item name='status' label='Máy bay chở khách'>
                            <Select
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                defaultValue={aircraftId}
                                onChange={onAircraft}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAircraft.map((item) => (
                                    <Option
                                        key={item.id}
                                        value={item.id}
                                        label={item?.aircraftName}
                                        defaultValue={item?.aircraftName}
                                    >
                                        <>
                                            <Row className='text-cityname'>{item?.aircraftName}</Row>
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
                                defaultValue={flightType}
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                disabled
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
                            label='Giá vé phổ thông'
                            onChange={(event) => setSeatPriceCONOMY(event.target.value)}
                        >
                            <Input
                                defaultValue={seatPriceECONOMY}
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
                                defaultValue={seatPricePREMIUM_ECONOMY}
                                style={{
                                    width: '90%'
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
                                defaultValue={seatPriceBUSINESS}
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

export default EditFlight
