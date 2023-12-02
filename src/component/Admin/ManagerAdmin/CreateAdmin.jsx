import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { getCountries } from '../../../services/apiAdmin'
import { useNavigate } from 'react-router-dom'
import { createEmpolyee } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import jwt from '../../../utils/jwt'
import { formatDate } from '../../../utils/format'

const { Text } = Typography

const CreateAdmin = () => {
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
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('MALE')
    const [idCard, setIdCard] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('EMPLOYEE')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')

    const [form] = Form.useForm()
    const onChange = (e) => {
        setUserType(e.target.value)
    }
    const navigate = useNavigate()
    const onChangeGender = (value) => {
        setGender(value)
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const handleContinue = async () => {
        const data = {
            name: name,
            dateOfBirth: formatDate(dateOfBirth),
            gender: gender,
            idCard: idCard,
            phoneNumber: phoneNumber,
            email: email,
            userType: userType,
            address: address,
            password: password,
            country: country
        }
        try {
            if (
                name === '' ||
                dateOfBirth === '' ||
                idCard === '' ||
                phoneNumber === '' ||
                email === '' ||
                address === '' ||
                password === '' ||
                country === ''
            ) {
                openNotification('warning', 'Thông báo', 'Bạn chưa nhập đủ thông tin')
                return
            }
            await createEmpolyee(data)
            openNotification('success', 'Thông báo', 'Thêm nhân viên thành công')
            navigate('/admins/employee')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }

    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='title-admin'>Thông Tin Cá Nhân</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/employee')}>
                    Hủy
                </Button>
                <Button className='btn-save' onClick={() => handleContinue()}>
                    Lưu
                </Button>
            </Row>
            <Row>
                <Col span={8}>
                    <Row className='avata-admin'>
                        <Avatar size={150} icon={<UserOutlined />} />
                    </Row>
                    <Row className='avata-admin' style={{ paddingTop: 20 }}>
                        <a>
                            <i>
                                <u> Cập Nhật Ảnh Đại Diện</u>
                            </i>
                        </a>
                    </Row>
                </Col>

                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item name='fullName' label='Họ& Tên:' onChange={(event) => setName(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='DateOfBirth' label='Ngày sinh:'>
                            <DatePicker
                                placeholder=''
                                format='DD/MM/YYYY'
                                size='large'
                                style={{
                                    width: '90%'
                                }}
                                onChange={onChangeDatePicker}
                            />
                        </Form.Item>
                        <Form.Item name='gender' label='Giới Tính:'>
                            <Select
                                defaultValue='MALE'
                                style={{
                                    width: '90%'
                                }}
                                size='large'
                                onChange={onChangeGender}
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
                            name='phoneNumber'
                            label=' Số điện thoại:'
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        >
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                size='small'
                            />
                        </Form.Item>
                        <Form.Item label='Mật khẩu:' onChange={(event) => setPassword(event.target.value)}>
                            <Input.Password
                                style={{
                                    width: '90%'
                                }}
                                size='small'
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
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
                        <Form.Item name='address' label='Địa chỉ:' onChange={(event) => setAddress(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
                                style={{ width: '90%', fontSize: 16, fontWeight: 500 }}
                                optionFilterProp='children'
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                onChange={onChangecountries}
                                size='large'
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
            </Row>
            <Row style={{ paddingTop: 20 }}>
                <Col span={8}>
                    <Text className='title-admin'>Phân Quyền</Text>{' '}
                </Col>{' '}
                <Col span={8}>
                    {' '}
                    <Radio.Group onChange={onChange} value={userType}>
                        {jwt.getUserRole() === 'ADMIN' ? (
                            <Radio value='MANAGER' style={{ fontSize: 18 }}>
                                Quản trị viên
                            </Radio>
                        ) : (
                            ''
                        )}
                        <Radio value='EMPLOYEE' style={{ fontSize: 18 }}>
                            Nhân viên
                        </Radio>
                    </Radio.Group>
                </Col>
            </Row>
        </div>
    )
}

export default CreateAdmin
