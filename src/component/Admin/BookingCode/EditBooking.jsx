import { Button, Col, Collapse, DatePicker, Input, Radio, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCountries, updateBooking } from '../../../services/apiAdmin'
import { useSelector } from 'react-redux'
import { CaretRightOutlined } from '@ant-design/icons'
import { formatCurrency, formatDate, formatDateString, formatTimeHHMM } from '../../../utils/format'
import { changeStatusAdmin, changeStatusBookingPayment } from '../../../utils/utils'
import 'dayjs/locale/vi'
import { openNotification } from '../../../utils/Notification'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import moment from 'moment'
dayjs.extend(customParseFormat)
const { Text } = Typography

const EditBooking = () => {
    const [listCountries, setListCountries] = useState([])
    useEffect(() => {
        fechListCountries()
    }, [])
    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']
    const bookingDetail = useSelector((state) => state.Admin?.bookingById?.bookingDetail)
    const flightAwayDetail = useSelector((state) => state.Admin?.bookingById?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.Admin?.bookingById?.flightReturnDetail)
    const passenger = useSelector((state) => state.Admin?.bookingById?.flightAwayDetail?.passengerAwaysDetail)
    const navigate = useNavigate()
    let aduls = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'ADULT')
    let childs = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'CHILD')
    let infants = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'INFANT')
    const [formDataAduls, setFormDataAduls] = useState(aduls)
    const handleInputChangeAduls = (id, field, value) => {
        const updatedFormData = formDataAduls.map((form) => {
            if (form.id === id) {
                return { ...form, [field]: value }
            }
            return form
        })
        setFormDataAduls(updatedFormData)
    }

    const handleDateChangeAduls = (id, date, dateString) => {
        handleInputChangeAduls(id, 'dateOfBirth', formatDate(dateString))
    }
    const handleSelectChange = (id, value) => {
        handleInputChangeAduls(id, 'country', value)
    }
    const [formDataChilds, setFormDataChilds] = useState(childs)
    const handleInputChangeChilds = (id, field, value) => {
        const updatedFormData = formDataChilds.map((form) => {
            if (form.id === id) {
                return { ...form, [field]: value }
            }
            return form
        })
        setFormDataChilds(updatedFormData)
    }

    const handleDateChangeChilds = (id, date, dateString) => {
        handleInputChangeChilds(id, 'dateOfBirth', formatDate(dateString))
    }
    const [formDataInfants, setFormDataInfants] = useState(infants)
    const handleInputChangeInfants = (id, field, value) => {
        const updatedFormData = formDataInfants.map((form) => {
            if (form.id === id) {
                return { ...form, [field]: value }
            }
            return form
        })
        setFormDataInfants(updatedFormData)
    }

    const handleDateChangeInfants = (id, date, dateString) => {
        handleInputChangeInfants(id, 'dateOfBirth', formatDate(dateString))
    }
    const handleContinue = async () => {
        const aduls = formDataAduls.map((item) => {
            // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
            const newItem = { ...item }
            // Loại bỏ các biến không mong muốn
            newItem.passengerId = newItem.id // Đổi tên biến "id" thành "passengerId"
            delete newItem.id
            delete newItem.color
            delete newItem.country
            delete newItem.createdAt
            delete newItem.imageUrl
            delete newItem.isPasserby
            delete newItem.passengerCode
            delete newItem.passengerType
            delete newItem.seatPrice
            delete newItem.status
            delete newItem.taxService
            delete newItem.updatedAt
            delete newItem.seat
            delete newItem.serviceOpts
            delete newItem.idCard
            return newItem
        })
        const childs = formDataChilds.map((item) => {
            // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
            const newItem = { ...item }
            // Loại bỏ các biến không mong muốn
            newItem.passengerId = newItem.id // Đổi tên biến "id" thành "passengerId"
            delete newItem.id
            delete newItem.color
            delete newItem.country
            delete newItem.createdAt
            delete newItem.imageUrl
            delete newItem.isPasserby
            delete newItem.passengerCode
            delete newItem.passengerType
            delete newItem.phoneNumber
            delete newItem.seatPrice
            delete newItem.status
            delete newItem.taxService
            delete newItem.updatedAt
            delete newItem.seat
            delete newItem.serviceOpts
            delete newItem.idCard
            delete newItem.address
            delete newItem.email
            return newItem
        })
        const infants = formDataInfants.map((item) => {
            // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
            const newItem = { ...item }
            // Loại bỏ các biến không mong muốn
            newItem.passengerId = newItem.id // Đổi tên biến "id" thành "passengerId"
            delete newItem.id
            delete newItem.color
            delete newItem.country
            delete newItem.createdAt
            delete newItem.imageUrl
            delete newItem.isPasserby
            delete newItem.passengerCode
            delete newItem.passengerType
            delete newItem.phoneNumber
            delete newItem.seatPrice
            delete newItem.status
            delete newItem.taxService
            delete newItem.updatedAt
            delete newItem.seat
            delete newItem.serviceOpts
            delete newItem.idCard
            delete newItem.address
            delete newItem.email
            return newItem
        })
        let data = []
        data.push(...aduls)
        data.push(...childs)
        data.push(...infants)
        try {
            await updateBooking(bookingDetail?.id, data)
            openNotification('success', 'Thông báo', `Đã Cập Nhật Thông Tin Thành Công `)
            navigate('/admins/booking')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    console.log('ứdsds', infants)
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='title-admin'>Thông Tin Mã Đặt vé</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/booking')}>
                    Hủy
                </Button>
                <Button className='btn-save' onClick={() => handleContinue()}>
                    Lưu
                </Button>
            </Row>
            <Row style={{ padding: '10px 0px 10px 0px' }}>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Mã Đặt Vé:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {bookingDetail?.bookingCode}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Tổng Tiền:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {formatCurrency(bookingDetail?.bookingCode)}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Ngày Đặt:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {formatDateString(bookingDetail?.createdAt)}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Loại:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {bookingDetail?.journeyType === 'RETURN' ? 'Khứ Hồi' : 'Một Chiều'}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Thanh Toán:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {changeStatusBookingPayment(bookingDetail?.paymentStatus, 'vi')}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Trạng Thái:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {changeStatusAdmin(bookingDetail?.status, 'vi')}
                    </Text>
                </Col>
            </Row>
            <Text style={{ fontSize: 16, fontWeight: 600, color: '#006885' }}>Chuyến Đi</Text>
            <Row style={{ padding: '10px 0px 10px 0px' }}>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Tên Chuyến Bay:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {flightAwayDetail?.flightCode}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Ngày Cất Cánh:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {formatTimeHHMM(flightAwayDetail?.departureTime)}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Ngày Hạ Cánh:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {formatTimeHHMM(flightAwayDetail?.arrivalTime)}
                    </Text>
                </Col>

                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Điểm Đi:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {flightAwayDetail?.sourceAirport?.airportName}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Điểm Đến:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {flightAwayDetail?.destinationAirport?.airportName}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Loại:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {flightAwayDetail?.flightType === 'DOMESTIC' ? 'Nội Địa' : 'Quốc Tế'}
                    </Text>
                </Col>
            </Row>
            <Text style={{ fontSize: 16, fontWeight: 600, color: '#006885' }}>Chuyến về</Text>
            <Row style={{ padding: '10px 0px 10px 0px' }}>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Tên Chuyến Bay:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {flightReturnDetail?.flightCode}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Ngày Cất Cánh:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {formatTimeHHMM(flightReturnDetail?.departureTime)}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Ngày Hạ Cánh:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {formatTimeHHMM(flightReturnDetail?.arrivalTime)}
                    </Text>
                </Col>

                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Điểm Đi:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {flightReturnDetail?.sourceAirport?.airportName}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Điểm Đến:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {' '}
                        {flightReturnDetail?.destinationAirport?.airportName}
                    </Text>
                </Col>
                <Col span={4}>
                    <Text style={{ fontSize: 15, fontWeight: 500, paddingRight: 10 }}>Loại:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#006885' }}>
                        {flightReturnDetail?.flightType === 'DOMESTIC' ? 'Nội Địa' : 'Quốc Tế'}
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col span={8} style={{ paddingRight: 15 }}>
                    {infants.map((form, index) => (
                        <div key={index}>
                            <Collapse
                                size='large'
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                Em Bé: {form?.lastName}
                                                {form?.firstName}
                                            </div>
                                        ),
                                        children: (
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Radio.Group
                                                        defaultValue={form.gender}
                                                        onChange={(e) =>
                                                            handleInputChangeInfants(form.id, 'gender', e.target.value)
                                                        }
                                                    >
                                                        <Radio value='MALE'>Nam</Radio>
                                                        <Radio value='FEMALE'>Nữ</Radio>
                                                        <Radio value='OTHER'>Khác</Radio>
                                                    </Radio.Group>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Họ:</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                defaultValue={form?.lastName}
                                                                onChange={(e) =>
                                                                    handleInputChangeInfants(
                                                                        form.id,
                                                                        'lastName',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Tên Đệm & Tên:</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                defaultValue={form?.firstName}
                                                                onChange={(e) =>
                                                                    handleInputChangeInfants(
                                                                        form.id,
                                                                        'firstName',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Ngày Sinh</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker
                                                                style={{ width: '90%' }}
                                                                placeholder=''
                                                                defaultValue={dayjs(
                                                                    moment(form?.dateOfBirth).format('DD/MM/YYYY'),
                                                                    dateFormatList[0]
                                                                )}
                                                                format={dateFormatList}
                                                                onChange={(date, dateString) =>
                                                                    handleDateChangeInfants(form.id, date, dateString)
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                    ))}
                </Col>
                <Col span={8} style={{ paddingRight: 15 }}>
                    {childs.map((form, index) => (
                        <div key={index}>
                            <Collapse
                                size='large'
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                Trẻ Em: {form?.lastName} {form?.firstName}
                                            </div>
                                        ),
                                        children: (
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Radio.Group
                                                        defaultValue={form.gender}
                                                        onChange={(e) =>
                                                            handleInputChangeChilds(form.id, 'gender', e.target.value)
                                                        }
                                                    >
                                                        <Radio value='MALE'>Nam</Radio>
                                                        <Radio value='FEMALE'>Nữ</Radio>
                                                        <Radio value='OTHER'>Khác</Radio>
                                                    </Radio.Group>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Họ:</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                defaultValue={form?.lastName}
                                                                onChange={(e) =>
                                                                    handleInputChangeChilds(
                                                                        form.id,
                                                                        'lastName',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Tên Đệm & Tên:</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                defaultValue={form?.firstName}
                                                                onChange={(e) =>
                                                                    handleInputChangeChilds(
                                                                        form.id,
                                                                        'firstName',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Ngày Sinh</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker
                                                                style={{ width: '90%' }}
                                                                placeholder=''
                                                                defaultValue={dayjs(
                                                                    moment(form?.dateOfBirth).format('DD/MM/YYYY'),
                                                                    dateFormatList[0]
                                                                )}
                                                                format={dateFormatList}
                                                                onChange={(date, dateString) =>
                                                                    handleDateChangeChilds(form.id, date, dateString)
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                    ))}
                </Col>
                <Col span={8}>
                    {aduls.map((form, index) => {
                        return (
                            <div key={index}>
                                <Collapse
                                    key='adult'
                                    size='large'
                                    items={[
                                        {
                                            key: { index },
                                            label: (
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                    Người Lớn: {form?.lastName} {form?.firstName}
                                                </div>
                                            ),
                                            children: (
                                                <div className='formPassengers'>
                                                    <Row className='rowInforPassengers'>
                                                        <Radio.Group
                                                            value={form.gender}
                                                            onChange={(e) =>
                                                                handleInputChangeAduls(
                                                                    form.id,
                                                                    'gender',
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <Radio value='MALE'>Nam</Radio>
                                                            <Radio value='FEMALE'>Nữ</Radio>
                                                            <Radio value='OTHER'>Khác</Radio>
                                                        </Radio.Group>
                                                    </Row>
                                                    <Row className='rowInforPassengers'>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Họ:</Text>
                                                            </Row>
                                                            <Row>
                                                                <Input
                                                                    style={{ width: '90%' }}
                                                                    defaultValue={form?.lastName}
                                                                    onChange={(e) =>
                                                                        handleInputChangeAduls(
                                                                            form.id,
                                                                            'lastName',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Tên Đệm& Tên:</Text>
                                                            </Row>
                                                            <Row>
                                                                <Input
                                                                    style={{ width: '90%' }}
                                                                    defaultValue={form?.firstName}
                                                                    onChange={(e) =>
                                                                        handleInputChangeAduls(
                                                                            form.id,
                                                                            'firstName',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className='rowInforPassengers'>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Ngày Sinh*</Text>
                                                            </Row>
                                                            <Row>
                                                                <DatePicker
                                                                    style={{ width: '90%' }}
                                                                    placeholder=''
                                                                    defaultValue={dayjs(
                                                                        moment(form?.dateOfBirth).format('DD/MM/YYYY'),
                                                                        dateFormatList[0]
                                                                    )}
                                                                    format={dateFormatList}
                                                                    onChange={(date, dateString) =>
                                                                        handleDateChangeAduls(form.id, date, dateString)
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Quốc Gia*</Text>
                                                            </Row>
                                                            <Row>
                                                                <Select
                                                                    showSearch
                                                                    style={{
                                                                        width: '91%',
                                                                        fontSize: 16,
                                                                        fontWeight: 500
                                                                    }}
                                                                    onChange={(value) =>
                                                                        handleSelectChange(form.id, value)
                                                                    }
                                                                    defaultValue={form?.country}
                                                                    optionFilterProp='children'
                                                                    filterOption={(input, option) =>
                                                                        (option?.label ?? '').includes(input)
                                                                    }
                                                                    filterSort={(optionA, optionB) =>
                                                                        (optionA?.label ?? '')
                                                                            .toLowerCase()
                                                                            .localeCompare(
                                                                                (optionB?.label ?? '').toLowerCase()
                                                                            )
                                                                    }
                                                                >
                                                                    {listCountries.map((item) => (
                                                                        <Option
                                                                            key={item.countryCode}
                                                                            value={item.countryCode}
                                                                            label={item.countryName}
                                                                        >
                                                                            {item.countryName}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className='rowInforPassengers'>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Số Điện Thoại*</Text>
                                                            </Row>
                                                            <Row>
                                                                <Input
                                                                    style={{ width: '90%' }}
                                                                    defaultValue={form?.phoneNumber}
                                                                    onChange={(e) =>
                                                                        handleInputChangeAduls(
                                                                            form.id,
                                                                            'phoneNumber',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Text className='text-passenger'>Email*</Text>
                                                            </Row>
                                                            <Row>
                                                                <Input
                                                                    style={{ width: '90%' }}
                                                                    defaultValue={form?.email}
                                                                    onChange={(e) =>
                                                                        handleInputChangeAduls(
                                                                            form.id,
                                                                            'email',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className='rowInforPassengers'>
                                                        <Col span={24}>
                                                            <Row>
                                                                <Text className='text-passenger'>Địa Chỉ:</Text>
                                                            </Row>
                                                            <Row>
                                                                <Input
                                                                    style={{ width: '95%' }}
                                                                    defaultValue={form?.address}
                                                                    onChange={(e) =>
                                                                        handleInputChangeAduls(
                                                                            form.id,
                                                                            'address',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        }
                                    ]}
                                    expandIconPosition='end'
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default EditBooking
