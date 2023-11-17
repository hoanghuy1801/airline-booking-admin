/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Button, Col, Input, Menu, Row, Table, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import './FlyCancel.css'
import { getListBooking, updateCancelBooking } from '../../../services/apiAdmin'
import { openNotification } from '../../../utils/Notification'
import { changeStatusAdmin, changeStatusCancelBooking } from '../../../utils/utils'
import { formatCurrency, formatDateString } from '../../../utils/format'

const { Text } = Typography

const items = [
    {
        label: 'Chưa xác nhận',
        key: 'pen'
    },
    {
        label: 'Đã xác nhận',
        key: 'del'
    }
]

const FlyCancel = () => {
    const [current, setCurrent] = useState('pen')
    const [listBooking, setListBooking] = useState([])
    const [checkListBooking, setCheckListBooking] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, SetTotalCount] = useState(0)
    const [status, setStatus] = useState('pen')
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        fechListBooking()
    }, [currentPage, status])
    const fechListBooking = async () => {
        const data = {
            bookingCode: textSearch,
            page: currentPage,
            size: 10
        }
        try {
            let res = await getListBooking(status, data)
            setListBooking(res.data.items)
            SetTotalCount(res.data.totalCount)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current)
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setCheckListBooking(selectedRows)
        }
    }

    const onClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'pen') {
            setStatus('pen')
            setCurrentPage(1)
            setDisabled(false)
        } else if (e.key === 'del') {
            setStatus('del')
            setCurrentPage(1)
            setDisabled(true)
        }
    }
    const dataSource = listBooking.map((item, index) => ({
        ...item,
        key: index + currentPage * 10 - 9
    }))
    // eslint-disable-next-line no-unused-vars

    const columns = [
        {
            title: 'MÃ ĐẶT VÉ',
            dataIndex: 'bookingCode',
            sorter: (a, b) => {
                return a.bookingCode.localeCompare(b.bookingCode)
            },
            width: 200
        },
        {
            title: 'TỔNG TIỀN',
            dataIndex: 'amountTotal',
            sorter: {
                compare: (a, b) => a.amountTotal - b.amountTotal,
                multiple: 1
            },
            render: (value, _record) => {
                return formatCurrency(value)
            },
            align: 'end',
            width: 150
        },
        {
            title: 'NGÀY ĐẶT VÉ',
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
            title: 'NGÀY GỬI YÊU CẦU',
            dataIndex: 'updatedAt',
            sorter: (a, b) => {
                return a.updatedAt.localeCompare(b.updatedAt)
            },
            render: (value, _record) => {
                return formatDateString(value)
            },
            width: 200,
            align: 'center'
        },
        {
            title: 'LÝ DO',
            dataIndex: 'note',
            width: 500
        },
        {
            title: 'TRẠNG THÁI',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => {
                const color = status === 'PEN' ? 'green' : status === 'DEL' ? 'orange' : 'orange' // Determine color based on tag value
                return (
                    <Tag color={color} key={status}>
                        {changeStatusCancelBooking(status, 'vi')}
                    </Tag>
                )
            },
            width: 170
        }
    ]
    const handleSearch = () => {
        fechListBooking()
    }
    const idList = checkListBooking.map((booking) => booking.id)
    const handleConfirm = async () => {
        let data = {
            ids: idList,
            status: 'DEL'
        }
        try {
            await updateCancelBooking(data)
            fechListBooking()
            openNotification('success', 'Thông báo', `Đã Xác Nhận Hủy Mã Đặt Vé `)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const handleCancel = async () => {
        let data = {
            ids: idList,
            status: 'ACT'
        }
        try {
            await updateCancelBooking(data)
            fechListBooking()
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    return (
        <div
            className='main-admin ant-card criclebox tablespace mb-24'
            style={{ background: '#fff', padding: 20, borderRadius: 12 }}
        >
            <Text className='titles-admin'>Yêu cầu Hủy/ Hoàn tiền</Text>

            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ paddingTop: 10 }}
            />

            <Row>
                <Col span={12}>
                    {' '}
                    <Button className='btn-confirm' disabled={disabled} onClick={() => handleConfirm()}>
                        Xác Nhận
                    </Button>
                    <Button className='btn-confirm' disabled={disabled} onClick={() => handleCancel()}>
                        Từ Chối
                    </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Input
                        className='input-search'
                        placeholder='Nhập mã đặt vé'
                        onChange={(event) => setTextSearch(event.target.value)}
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

                <div className='table' style={{ marginTop: 20 }}>
                    <Table
                        rowSelection={{
                            ...rowSelection
                        }}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,
                            total: totalCount
                        }}
                        onChange={onChange}
                    />
                </div>
            </Row>
        </div>
    )
}

export default FlyCancel
