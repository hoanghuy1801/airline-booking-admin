import { Button, Form, Input, Typography, Divider, Row, Col } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../Auth/Login.css'
import { GoogleOutlined, FacebookFilled, RollbackOutlined } from '@ant-design/icons'
import { getInforUser, postLogin } from '../../services/apiAuth'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { setInforUser, setIsAuthenticated } from '../../redux/reducers/Auth'
import { showWaringModal } from '../../utils/modalError'
import jwt from '../../utils/jwt'
import { getInforEmployee } from '../../services/apiAdmin'
import { setInforEmployee, setIsAuthenticatedEmployee } from '../../redux/reducers/Admin'

const { Text } = Typography
const Login = () => {
    const { getText } = useLanguage()
    const [phoneNumber, setphoneNumber] = useState('')

    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispastch = useDispatch()
    const dataLogin = {
        phoneNumber: phoneNumber,
        password: password
    }
    const validatePhone = (phoneNumber) => {
        return String(phoneNumber)
            .toLowerCase()
            .match(/^\d{10}$/)
    }
    const handleLogin = async () => {
        const isValiPhone = validatePhone(phoneNumber)
        if (!isValiPhone) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhoneFomat')}`, `${getText('Close')}`)
            return
        } else if (password == '') {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPassword')}`, `${getText('Close')}`)
            return
        }
        try {
            let res = await postLogin(dataLogin)
            if (res.status == 200) {
                jwt.setToken(res.data.access_token)
                console.log('test', jwt.getUserRole())
                if (jwt.getUserRole() === 'CUSTOMER') {
                    let ress = await getInforUser()
                    dispastch(setInforUser(ress.data))
                    dispastch(setIsAuthenticated(true))
                    navigate('/')
                } else {
                    let ress = await getInforEmployee()
                    dispastch(setInforEmployee(ress.data))
                    dispastch(setIsAuthenticatedEmployee(true))
                    navigate('/admins')
                }
            }
        } catch (e) {
            showWaringModal(`${getText('HeyFriend')}`, e.response.data.error.message, `${getText('Close')}`)
        }
    }
    return (
        <div className='page-login'>
            <Form className='loginForm'>
                <Row className='RegisterForm-title'>
                    <Text className='title-Login'>{getText('TitleLogin')}</Text>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>{getText('Account')}:</label>
                    </Col>
                    <Col span={20}>
                        <Form.Item value={phoneNumber} onChange={(event) => setphoneNumber(event.target.value)}>
                            <Input placeholder={getText('InputAccount')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>{getText('Password')}:</label>
                    </Col>
                    <Col span={20}>
                        <Form.Item value={password} onChange={(event) => setPassword(event.target.value)}>
                            <Input.Password placeholder={getText('InputPassword')} />
                            <Typography.Text className='forgot-password'>{getText('Forgot')}</Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>

                <Button type='primary' htmlType='submit' block className='btn-login' onClick={() => handleLogin()}>
                    {getText('LOGIN')}
                </Button>

                <div className='register'>
                    <span>
                        {getText('NotAccount')}
                        <a
                            onClick={() => {
                                navigate('/register')
                            }}
                        >
                            {' '}
                            {getText('RegisterNow')}
                        </a>
                    </span>
                </div>
                <Divider style={{ borderColor: 'black' }}>Hoặc đăng nhập bằng</Divider>
                <div className='socialLogin'>
                    <GoogleOutlined className='socialIcon' style={{ color: 'red' }} />
                    <FacebookFilled className='socialIcon' style={{ color: 'blue' }} />
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
export default Login
