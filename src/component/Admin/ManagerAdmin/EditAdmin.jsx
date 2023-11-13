import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { getCountries } from '../../../services/apiAdmin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { openNotification } from '../../../utils/Notification'
import { editEmployee } from '../../../services/apiAdmin'
import { formatDate } from '../../../utils/format'

const { Text } = Typography

const EditAdmin = () => {
    const employeeById = useSelector((state) => state.Admin.employeeById)
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
    const [name, setName] = useState(employeeById?.name)
    const [dateOfBirth, setDateOfBirth] = useState(employeeById?.dateOfBirth)
    const [gender, setGender] = useState(employeeById?.gender)
    const [idCard, setIdCard] = useState(employeeById?.idCard)
    const [email, setEmail] = useState(employeeById?.email)
    const [userType, setUserType] = useState(employeeById?.user?.userType)
    const [country, setCountry] = useState(employeeById?.country)
    const [address, setAddress] = useState(employeeById?.address)
    const [status, setStatus] = useState(employeeById?.status)
    const [form] = Form.useForm()

    const onChange = (e) => {
        setUserType(e.target.value)
    }
    const navigate = useNavigate()
    const onDateOfBirth = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const handleChange = (value) => {
        setStatus(value)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const handleGender = (value) => {
        setGender(value)
    }
    const handleContinue = async () => {
        const data = {
            name: name,
            dateOfBirth: formatDate(dateOfBirth) === 'Invalid date' ? '' : formatDate(dateOfBirth),
            gender: gender,
            idCard: idCard,
            email: email,
            userType: userType,
            address: address,
            country: country,
            status: status
        }

        try {
            await editEmployee(employeeById?.id, data)
            openNotification('success', 'Thông báo', 'Sửa thông tin thành công')
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
            <Text className='title-admin'>Thông tin cá nhân</Text>
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
                                defaultValue={employeeById?.name}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='DateOfBirth' label='Ngày sinh:'>
                            <DatePicker
                                // value={date}
                                //  defaultValue={date}
                                onChange={onDateOfBirth}
                                format='DD/MM/YYYY'
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='gender' label='Giới Tính:'>
                            <Select
                                defaultValue={employeeById?.gender}
                                style={{
                                    width: '90%'
                                }}
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
                        <Form.Item name='phoneNumber' label=' Số điện thoại:'>
                            <Input
                                disabled
                                defaultValue={employeeById?.phoneNumber}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='status' label='Trạng thái:'>
                            <Select
                                defaultValue={employeeById?.status}
                                style={{
                                    width: '90%'
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'ACT',
                                        label: 'Hoạt động'
                                    },
                                    {
                                        value: 'PEN',
                                        label: 'Tạm dừng'
                                    }
                                ]}
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
                                defaultValue={employeeById?.idCard}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='email' label='Email:' onChange={(event) => setEmail(event.target.value)}>
                            <Input
                                defaultValue={employeeById?.email}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='address' label='Địa chỉ:' onChange={(event) => setAddress(event.target.value)}>
                            <Input
                                defaultValue={employeeById?.address}
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
                                defaultValue={employeeById?.country}
                                onChange={onChangecountries}
                                style={{ width: '90%', fontSize: 16, fontWeight: 500 }}
                                optionFilterProp='children'
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
            </Row>
            <Row style={{ paddingTop: 20 }}>
                <Col span={8}>
                    <Text className='title-admin'>Phân Quyền</Text>{' '}
                </Col>{' '}
                <Col span={8}>
                    {' '}
                    <Radio.Group onChange={onChange} value={userType}>
                        <Radio value='MANAGER' style={{ fontSize: 18 }}>
                            Quản trị viên
                        </Radio>
                        <Radio value='EMPLOYEE' style={{ fontSize: 18 }}>
                            Nhân viên
                        </Radio>
                    </Radio.Group>
                </Col>
            </Row>
        </div>
    )
}

export default EditAdmin
