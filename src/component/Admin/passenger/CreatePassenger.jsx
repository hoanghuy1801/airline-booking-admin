import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { CreatePassenger, editPassenger, getCountries } from '../../../services/apiAdmin'
import { useNavigate } from 'react-router-dom'

import { openNotification } from '../../../utils/Notification'
import { formatDate } from '../../../utils/format'

const { Text } = Typography

const EditPassenger = () => {
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
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [gender, setGender] = useState('MALE')
    const [idCard, setIdCard] = useState()
    const [email, setEmail] = useState()

    const [country, setCountry] = useState()
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
            country: country,
            password: password,
            phoneNumber: phoneNumber
        }
        console.log('huy', data)
        try {
            await CreatePassenger(data)
            openNotification('success', 'Thông báo', 'Tạo Tài Khoản Thành Công')
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
            <Text className='title-admin'>Tạo Tài Khoản Khách Hàng</Text>
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
                    <Row className='avata-admin'></Row>
                    <Row
                        className='avata-admin'
                        style={{ paddingTop: 20, paddingLeft: 20, fontSize: 18, fontWeight: 500, color: 'black' }}
                    ></Row>
                </Col>

                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Họ:' onChange={(event) => setFirstName(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Tên đệm & Tên:' onChange={(event) => setLastName(event.target.value)}>
                            <Input
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
                        <Form.Item label='Số điện thoại:' onChange={(event) => setPhoneNumber(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Mật Khẩu:' onChange={(event) => setPassword(event.target.value)}>
                            <Input.Password
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
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

                        <Form.Item name='gender' label='Giới Tính:'>
                            <Select
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
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='email' label='Email:' onChange={(event) => setEmail(event.target.value)}>
                            <Input
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
