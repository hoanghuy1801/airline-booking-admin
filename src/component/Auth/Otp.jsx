import { useState, useEffect } from 'react'
import { Button, Form, Typography } from 'antd'
import { InputOTP } from 'antd-input-otp'
import { useNavigate } from 'react-router-dom'
import './Otp.css'
import { postSendOTP, postVerifyOTP } from '../../services/apiAuth'
import { convertString } from '../../utils/format'
import { showErrorModal, showSuccessModal, showWaringModal } from '../../utils/modalError'
import { openNotification } from '../../utils/Notification'
import { useSelector } from 'react-redux'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const Otp = () => {
    const { getText } = useLanguage()
    const InfoRegister = useSelector((state) => state.Auth.InfoRegister)
    const [timeLeft, setTimeLeft] = useState(120)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        const { otp } = values
        if (!otp || otp.includes(undefined) || otp.includes(''))
            return form.setFields([
                {
                    name: 'otp',
                    errors: [`${getText('NotValidOTP')}`]
                }
            ])
        let res = await postVerifyOTP(convertString(otp))
        if (res.data.status == 400) {
            showErrorModal(`${getText('Notification')}`, `${getText('NotOTP')}`, `${getText('Close')}`)
        } else {
            openNotification('success', `${getText('Notification')}`, `${getText('SuccessRegister')}`)
            navigate('/')
        }
    }
    const hanldeSentOTP = async () => {
        if (timeLeft == 0) {
            await postSendOTP()
            showSuccessModal(`${getText('Notification')}`, `${getText('AgainOTP')}`, `${getText('Close')}`)
        } else {
            showWaringModal(
                `${getText('Notification')}`,
                `${getText('TryAgain')} ${getText('after')} ${timeLeft} ${getText('second')}`,
                `${getText('Close')}`
            )
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            }
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [timeLeft])

    return (
        <main className='app'>
            <section className='card'>
                <h2>{getText('VerificationCode')}</h2>
                <div className='form-text'>
                    <Text className='text-information'>{getText('textVerificationCode')}</Text>
                </div>
                <div className='form-text'>
                    <Text className='text-email'>{InfoRegister.phoneNumber}</Text>
                </div>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name='otp'
                        className='center-error-message'
                        rules={[{ validator: async () => Promise.resolve() }]}
                    >
                        <InputOTP autoFocus inputType='numeric' length={6} inputClassName='input-classname' />
                    </Form.Item>
                    <div className='form-text'>
                        <Text className='text-not'>
                            {getText('HaveCode')} {getText('Press')}{' '}
                            <u className='text-sendTo' onClick={() => hanldeSentOTP()}>
                                {getText('SendTo')}
                            </u>{' '}
                            {getText('after')} <Text style={{ color: 'red' }}>{timeLeft}</Text> {getText('second')}
                        </Text>
                    </div>
                    <Form.Item noStyle>
                        <Button block htmlType='submit' type='primary' className='btn-accuracy'>
                            {getText('Authentication')}
                        </Button>
                    </Form.Item>
                    <div className='form-text'>
                        <Text className='text-back' onClick={() => navigate('/register')}>
                            {getText('Back')}
                        </Text>
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default Otp
