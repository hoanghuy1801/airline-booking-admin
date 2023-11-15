/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, Mentions, Menu, Tag, Dropdown, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import {
    actEmployee,
    getEmployeeId,
    getListEmployee,
    getListPassgenger,
    penEmployee,
    updateStatusPassenger
} from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import { changeStatusAdmin } from '../../../utils/utils'
import { formatDateString } from '../../../utils/format'
import { IconDotsVertical } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { setEmployeeById } from '../../../redux/reducers/Admin'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography
const itemss = [
    {
        label: 'Hoạt động',
        key: 'act'
    },
    {
        type: 'divider'
    },
    {
        label: 'Tạm ngưng',
        key: 'pen'
    },
    {
        type: 'divider'
    },
    {
        label: 'Chỉnh sửa',
        key: 'edit'
    }
]
const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Hoạt động',
        key: 'act'
    },
    {
        label: 'Tạm ngưng',
        key: 'pen'
    }
]

const Passenger = () => {
    const [listPassgenger, setListPassgenger] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, SetTotalCount] = useState(0)
    const [status, setStatus] = useState('ALL')
    const dispastch = useDispatch()
    const dataSource = listPassgenger.map((item, index) => ({
        ...item,
        stt: index + currentPage * 10 - 9
    }))
    const dataSources = dataSource.map((item, index) => ({
        ...item,
        key: item.id // Sử dụng ID của nhân viên làm giá trị key
    }))
    useEffect(() => {
        fechListPassgenger()
    }, [currentPage, status, textSearch])

    const fechListPassgenger = async () => {
        const data = {
            page: currentPage,
            size: 10,
            status: status,
            searchText: textSearch
        }
        try {
            let res = await getListPassgenger(data)
            setListPassgenger(res.data.items)
            SetTotalCount(res.data.totalCount)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const navigate = useNavigate()
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 70,
            align: 'center',
            sorter: {
                compare: (a, b) => a.stt - b.stt,
                multiple: 1
            }
        },
        {
            title: 'HỌ& TÊN',
            dataIndex: 'firstName',
            render: (value, _record) => {
                return _record?.firstName + ' ' + _record?.lastName
            },
            sorter: (a, b) => {
                let nameA = a?.firstName + ' ' + a?.lastName
                let nameB = b?.firstName + ' ' + b?.lastName
                return nameA.localeCompare(nameB)
            },

            width: 200
        },
        {
            title: 'MÃ KHÁCH HÀNG',
            dataIndex: 'passengerCode',
            sorter: (a, b) => {
                return a.passengerCode.localeCompare(b.passengerCode)
            },
            width: 170
        },

        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'phoneNumber',
            sorter: (a, b) => {
                return a.phoneNumber.localeCompare(b.phoneNumber)
            },
            width: 160,
            align: 'end'
        },
        {
            title: 'CCCD',
            dataIndex: 'idCard',
            sorter: (a, b) => {
                return a.email.localeCompare(b.email)
            },
            width: 160,
            align: 'end'
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            sorter: (a, b) => {
                return a.email.localeCompare(b.email)
            },
            width: 250
        },

        {
            title: 'NGÀY TẠO',
            dataIndex: 'createdAt',
            sorter: (a, b) => {
                return a.createdAt.localeCompare(b.createdAt)
            },
            render: (value, _record) => {
                return formatDateString(value)
            },
            width: 200,
            align: 'center'
        },
        {
            title: 'TRẠNG THÁI',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => {
                const color = status === 'ACT' ? 'green' : status === 'PEN' ? 'orange' : 'orange' // Determine color based on tag value
                return (
                    <Tag color={color} key={status}>
                        {changeStatusAdmin(status, 'vi')}
                    </Tag>
                )
            },
            width: 150
        },
        {
            title: 'XỬ LÝ',
            key: 'id',
            render: (value, record) => (
                <Dropdown
                    menu={{
                        items: itemss.map((item, index) => ({
                            ...item,
                            key: item.key || index.toString()
                        })),

                        onClick: (e) => handleClickMe(record.id, record.employeeCode, e)
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space
                            style={{
                                paddingLeft: 10,
                                fontSize: 15,
                                fontWeight: 500,
                                color: '#006885'
                            }}
                        >
                            <IconDotsVertical />
                        </Space>
                    </a>
                </Dropdown>
            )
        }
    ]
    const [current, setCurrent] = useState('all')
    const onClick = async (e) => {
        setCurrent(e.key)
        if (e.key === 'all') {
            setStatus('')
            setCurrentPage(1)
        } else if (e.key === 'act') {
            setStatus('ACT')
            setCurrentPage(1)
        } else if (e.key === 'pen') {
            setStatus('PEN')
            setCurrentPage(1)
        }
    }
    const onChange = async (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current)
    }
    const onSearch = (value, _e, info) => {
        setTextSearch(value)
    }
    const handleClickMe = async (id, code, e) => {
        if (e.key === 'act') {
            let data = {
                status: 'ACT'
            }
            try {
                await updateStatusPassenger(id, data)
                fechListPassgenger()
                openNotification('success', 'Thông báo', `Đã Hoạt Động Khách Hàng ${code}`)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        } else if (e.key === 'pen') {
            let data = {
                status: 'PEN'
            }
            try {
                await updateStatusPassenger(id, data)
                fechListPassgenger()
                openNotification('success', 'Thông báo', `Đã Tạm Ngưng Khách Hàng ${code}`)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        } else if (e.key === 'edit') {
            let res = await getEmployeeId(id)
            dispastch(setEmployeeById(res.data))
            navigate('/admins/employee/edit')
        }
    }
    const handleSearch = () => {
        fechListPassgenger()
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: '20px', borderRadius: 12 }}
        >
            <Text className='titles-admin'>Danh Sách Khách Hàng</Text>

            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ paddingTop: 10 }}
            />
            <Row>
                <Col span={12}>
                    <Button className='btn-create' onClick={() => navigate('/admins/employee/create')}>
                        Thêm
                    </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Input
                        className='input-search'
                        placeholder='Nhập mã hoặc tên khách hàng'
                        onSearch={onSearch}
                        size='large'
                        style={{ marginTop: 10 }}
                    />

                    <Button
                        className='btn-save'
                        style={{ marginTop: 10, marginRight: 20 }}
                        onClick={() => handleSearch()}
                    >
                        Lưu
                    </Button>
                </Col>
            </Row>
            <div className='table'>
                <Table
                    columns={columns}
                    dataSource={dataSources}
                    pagination={{
                        current: currentPage,
                        pageSize: 10,
                        total: totalCount,
                        onChange: onChange
                    }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Passenger
