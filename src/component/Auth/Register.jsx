import { Button, DatePicker, Form, Input, Row, Col, Typography, Divider, Select } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../Auth/Register.css'
import { GoogleOutlined, FacebookFilled, RollbackOutlined } from '@ant-design/icons'
import { getCountries, postRegister } from '../../services/apiAuth'
import { formatDate } from '../../utils/format'
import { showWaringModal } from '../../utils/modalError'
import jwt from '../../utils/jwt'
import { setInfoRegister } from '../../redux/reducers/Auth'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'

const { Text } = Typography

const Register = () => {
    const { getText } = useLanguage()
    const [listCountries, setListCountries] = useState([])
    useEffect(() => {
        fechListCountries()
    }, [])

    const [firstName, setFirstName] = useState('')

    const [lastName, setLastName] = useState('')

    const [gender, setGender] = useState('MALE')

    const [dateOfBirth, setDateOfBirth] = useState('')

    const [country, setCountry] = useState('')

    const [email, setEmail] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')

    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispastch = useDispatch()

    const RegisterOr = () => {
        // eslint-disable-next-line no-undef
        message.success('Register oke nha')
    }

    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const onChangeGender = (value) => {
        setGender(value)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const data = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: formatDate(dateOfBirth),
        country: country,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        password: password
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }
    const validatePhone = (phoneNumber) => {
        return String(phoneNumber)
            .toLowerCase()
            .match(/^\d{10}$/)
    }
    const handleRegister = async () => {
        try {
            const isValiEmail = validateEmail(email)
            const isValiPhone = validatePhone(phoneNumber)
            if (data.firstName == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotLastName')}`, `${getText('Close')}`)
                return
            } else if (lastName == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotName')}`, `${getText('Close')}`)
                return
            } else if (gender == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotGender')}`, `${getText('Close')}`)
                return
            } else if (dateOfBirth == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotDateBirth')}`, `${getText('Close')}`)
                return
            } else if (country == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotCountry')}`, `${getText('Close')}`)
                return
            } else if (email == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotEmail')}`, `${getText('Close')}`)
                return
            } else if (!isValiEmail) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotEmailFomat')}`, `${getText('Close')}`)
                return
            } else if (phoneNumber == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhone')}`, `${getText('Close')}`)
                return
            } else if (!isValiPhone) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhoneFomat')}`, `${getText('Close')}`)
                return
            } else if (password == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPassword')}`, `${getText('Close')}`)
                return
            }
            let res = await postRegister(data)
            if (res.status == 201) {
                jwt.setToken(res.data.access_token)
                dispastch(setInfoRegister(data))
                navigate('/register/otp')
            }
        } catch (e) {
            showWaringModal(`${getText('HeyFriend')}`, e.response.data.error.message, `${getText('Close')}`)
        }
    }

    return (
        <div className='page-Register'>
            <Form className='RegisterForm'>
                <Row className='RegisterForm-title'>
                    <Text className='title-Login'>{getText('TitleRegister')}</Text>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={10}>
                        <Row>
                            <Input
                                className='text-input'
                                placeholder={getText('Surname')}
                                style={{ width: '90%' }}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Row>
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Input
                                className='text-input'
                                placeholder={getText('Middle-name&first-name')}
                                style={{ width: '100%' }}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>
                <Text className='text-instruct-name'>{getText('textInstructionsLogin')}</Text>
                <Row className='rowInforRegister' style={{ paddingTop: 15 }}>
                    <Col span={10}>
                        <Text className='text-Date'> {getText('Gender')}:</Text>
                        <Select
                            style={{
                                width: '60%'
                            }}
                            defaultValue='Nam'
                            onChange={onChangeGender}
                            options={[
                                {
                                    value: 'MALE',
                                    label: 'Nam'
                                },
                                {
                                    value: 'FEMALE',
                                    label: 'Nữ'
                                },
                                {
                                    value: 'OTHER',
                                    label: 'Khác'
                                }
                            ]}
                        />
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Text className='text-Date'> {getText('Date-birth')}:</Text>
                            <DatePicker
                                className='text-input'
                                placeholder='--/--/----'
                                format='DD/MM/YYYY'
                                onChange={onChangeDatePicker}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={10}>
                        <Row>
                            <Select
                                showSearch
                                style={{ width: '91%', fontSize: 16, fontWeight: 500 }}
                                placeholder={getText('Nation')}
                                optionFilterProp='children'
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={onChangecountries}
                            >
                                {listCountries.map((item) => (
                                    // eslint-disable-next-line react/jsx-no-undef
                                    <Option key={item.countryCode} value={item.countryCode} label={item.countryName}>
                                        {item.countryName}
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Input
                                placeholder='Email'
                                style={{ width: '100%' }}
                                className='text-input'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={24}>
                        <Row>
                            <Input
                                placeholder={getText('Phone-number')}
                                style={{ width: '100%' }}
                                className='text-input'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={24}>
                        <Row>
                            <Input.Password
                                placeholder={getText('Password')}
                                style={{ width: '100%' }}
                                className='text-input'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>

                <Row className='rowbtn-register'>
                    <Button type='primary' danger className='btn-register' onClick={() => handleRegister()}>
                        {getText('Register')}
                    </Button>
                </Row>
                <div className='register'>
                    <span>
                        {getText('HaveAccount')}
                        <a
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            {' '}
                            {getText('LoginNow')}
                        </a>
                    </span>
                </div>
                <Divider style={{ borderColor: 'black' }}>Hoặc đăng ký bằng</Divider>
                <div className='socialRegister'>
                    <GoogleOutlined className='socialIcon' onClick={() => RegisterOr()} style={{ color: 'red' }} />
                    <FacebookFilled className='socialIcon' onClick={() => RegisterOr()} style={{ color: 'blue' }} />
                </div>
                <div>
                    <span
                        className='back-home'
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <RollbackOutlined /> {getText('BackHome')}
                    </span>
                </div>
            </Form>
        </div>
    )
}
export default Register
