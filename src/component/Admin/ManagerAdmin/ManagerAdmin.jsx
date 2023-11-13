/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, Mentions, Menu, Tag, Dropdown } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ManagerAdmin.css'
import { useNavigate } from 'react-router-dom'
import { actEmployee, getEmployeeId, getListEmployee, penEmployee } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import { changeStatusAdmin } from '../../../utils/utils'
import { formatDateString } from '../../../utils/format'
import { IconDotsVertical } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { setEmployeeById } from '../../../redux/reducers/Admin'
const { Search } = Input
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

const ManagerAdmin = () => {
    const [listEmployee, setListEmployee] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, SetTotalCount] = useState(0)
    const [status, setStatus] = useState('')
    const dispastch = useDispatch()
    const dataSource = listEmployee.map((item, index) => ({
        ...item,
        stt: index + currentPage * 10 - 9
    }))
    const dataSources = dataSource.map((item, index) => ({
        ...item,
        key: item.id // Sử dụng ID của nhân viên làm giá trị key
    }))
    useEffect(() => {
        fechListEmpoyee()
    }, [currentPage, status, textSearch])

    const fechListEmpoyee = async () => {
        const data = {
            page: currentPage,
            size: 10,
            status: status,
            searchText: textSearch
        }
        try {
            let res = await getListEmployee(data)
            setListEmployee(res.data.items)
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
            width: 70
        },
        {
            title: 'MÃ NHÂN VIÊN',
            dataIndex: 'employeeCode',
            sorter: (a, b) => {
                return a.employeeCode.localeCompare(b.employeeCode)
            },
            width: 170
        },
        {
            title: 'HỌ TÊN',
            dataIndex: 'name',
            sorter: (a, b) => {
                return a.name.localeCompare(b.name)
            },
            width: 230
        },
        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'phoneNumber',
            sorter: (a, b) => {
                return a.phoneNumber.localeCompare(b.phoneNumber)
            },
            width: 170
        },
        {
            title: 'CCCD',
            dataIndex: 'idCard',
            sorter: (a, b) => {
                return a.email.localeCompare(b.email)
            },
            width: 170
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            sorter: (a, b) => {
                return a.email.localeCompare(b.email)
            },
            width: 200
        },
        {
            title: 'CHỨC VỤ',
            dataIndex: 'user?.userType',
            render: (value, _record) => {
                let userType = null
                if (!_record.user) {
                    return 'Không xác định'
                }
                if (_record.user.userType === 'MANAGER') {
                    userType = 'Quản lý'
                } else {
                    userType = 'Nhân viên'
                }
                return userType
            },

            width: 150
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
            width: 200
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
            try {
                await actEmployee(id)
                fechListEmpoyee()
                openNotification('success', 'Thông báo', `Đã Hoạt Động Nhân Viên ${code}`)
            } catch (e) {
                openNotification('error', 'Thông báo', e.response.data.error.message)
            }
        } else if (e.key === 'pen') {
            try {
                await penEmployee(id).then(async () => {
                    fechListEmpoyee()
                    openNotification('success', 'Thông báo', `Đã Tạm Ngưng Nhân Viên ${code}`)
                })
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
        fechListEmpoyee()
    }
    return (
        <div
            className='ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <p className='title-admin'>Quản Lý Nhân Viên</p>
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
                        placeholder='Nhập tên chuyến bay'
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
                    {/* <Search
                        allowClear
                        placeholder='Nhập Mã hoặc Tên Nhân Viên'
                        enterButton='Tìm'
                        size='large'
                        className='input-search'
                        onSearch={onSearch}
                    /> */}
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
                    scroll={{
                        y: 540
                    }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default ManagerAdmin
