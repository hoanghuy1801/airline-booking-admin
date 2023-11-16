import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { editPassenger, getCountries } from '../../../services/apiAdmin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { openNotification } from '../../../utils/Notification'
import { editEmployee } from '../../../services/apiAdmin'
import { formatDate } from '../../../utils/format'
import { getAcronym } from '../../../utils/utils'

const { Text } = Typography

const EditPassenger = () => {
    const inforPassenger = useSelector((state) => state.Admin.inforPassenger)
    useEffect(() => {
        fechListCountries()
    }, [])
    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const [listCountries, setListCountries] = useState([])
    const [firstName, setFirstName] = useState(inforPassenger?.firstName)
    const [lastName, setLastName] = useState(inforPassenger?.lastName)
    const [dateOfBirth, setDateOfBirth] = useState(inforPassenger?.dateOfBirth)
    const [gender, setGender] = useState(inforPassenger?.gender)
    const [idCard, setIdCard] = useState(inforPassenger?.idCard)
    const [email, setEmail] = useState(inforPassenger?.email)

    const [country, setCountry] = useState(inforPassenger?.country)
    const [form] = Form.useForm()

    const navigate = useNavigate()
    const onDateOfBirth = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const handleGender = (value) => {
        setGender(value)
    }
    const handleContinue = async () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: formatDate(dateOfBirth) === 'Invalid date' ? '' : formatDate(dateOfBirth),
            gender: gender,
            idCard: idCard,
            email: email,
            country: country
        }

        try {
            await editPassenger(inforPassenger?.id, data)
            openNotification('success', 'Thông báo', 'Sửa thông tin thành công')
            navigate('/admins/passenger')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='title-admin'>Thông Tin Khách Hàng</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/passenger')}>
                    Hủy
                </Button>
                <Button className='btn-save' onClick={() => handleContinue()}>
                    Lưu
                </Button>
            </Row>
            <Row>
                <Col span={8}>
                    <Row className='avata-admin'>
                        <Avatar
                            size={140}
                            style={{
                                backgroundColor: `${inforPassenger?.color}`,
                                marginLeft: 20
                            }}
                        >
                            {getAcronym(inforPassenger.firstName)}
                            {getAcronym(inforPassenger.lastName)}
                        </Avatar>
                    </Row>
                    <Row
                        className='avata-admin'
                        style={{ paddingTop: 20, paddingLeft: 20, fontSize: 18, fontWeight: 500, color: 'black' }}
                    >
                        {inforPassenger.firstName} {inforPassenger.lastName}
                    </Row>
                </Col>

                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Họ:' onChange={(event) => setFirstName(event.target.value)}>
                            <Input
                                defaultValue={inforPassenger?.firstName}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Tên đệm & Tên:' onChange={(event) => setLastName(event.target.value)}>
                            <Input
                                defaultValue={inforPassenger?.lastName}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='DateOfBirth' label='Ngày sinh:'>
                            <DatePicker
                                size='large'
                                onChange={onDateOfBirth}
                                format='DD/MM/YYYY'
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
                                defaultValue={inforPassenger?.country}
                                onChange={onChangecountries}
                                style={{ width: '90%', fontSize: 16, fontWeight: 500 }}
                                optionFilterProp='children'
                                size='large'
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                            >
                                {listCountries.map((item) => (
                                    // eslint-disable-next-line react/jsx-no-undef
                                    <Option key={item.countryCode} value={item.countryCode} label={item.countryName}>
                                        {item.countryName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item name='phoneNumber' label=' Số điện thoại:'>
                            <Input
                                disabled
                                defaultValue={inforPassenger?.phoneNumber}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='gender' label='Giới Tính:'>
                            <Select
                                defaultValue={inforPassenger?.gender}
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                onChange={handleGender}
                                options={[
                                    {
                                        value: 'MALE',
                                        label: 'Nam'
                                    },
                                    {
                                        value: 'FEMALE',
                                        label: 'Nữ'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name='url'
                            label='Số CMND/CCCD/Hộ Chiếu:'
                            onChange={(event) => setIdCard(event.target.value)}
                        >
                            <Input
                                defaultValue={inforPassenger?.idCard}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='email' label='Email:' onChange={(event) => setEmail(event.target.value)}>
                            <Input
                                defaultValue={inforPassenger?.email}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default EditPassenger
