/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, Drawer, Affix } from 'antd'
import Sidenav from './Sidenav'
import Header from './Header'
const { Header: AntHeader, Content, Sider } = Layout

import '../styles/responsive.css'
import '../styles/main.css'
// eslint-disable-next-line react/prop-types
function Main({ children }) {
    const [visible, setVisible] = useState(false)
    const [placement, setPlacement] = useState('right')
    const [sidenavColor, setSidenavColor] = useState('#1890ff')
    const [sidenavType, setSidenavType] = useState('transparent')
    const [fixed, setFixed] = useState(false)

    let { pathname } = useLocation()
    pathname = pathname.replace('/', '')

    useEffect(() => {
        if (pathname === 'rtl') {
            setPlacement('left')
        } else {
            setPlacement('right')
        }
    }, [pathname])

    return (
        <Layout className={`layout-dashboard ${pathname === 'profile' ? 'layout-profile' : ''} `}>
            <Sider
                breakpoint='lg'
                collapsedWidth='0'
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type)
                }}
                trigger={null}
                width={240}
                theme='light'
                className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
                style={{ background: sidenavType }}
            >
                <Sidenav color={sidenavColor} />
            </Sider>
            <Layout>
                <Affix>
                    <AntHeader className={`${fixed ? 'ant-header-fixed' : ''} ant-card criclebox tablespace mb-24`}>
                        <Header name={pathname} />
                    </AntHeader>
                </Affix>

                <Content className='content-ant'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Main
