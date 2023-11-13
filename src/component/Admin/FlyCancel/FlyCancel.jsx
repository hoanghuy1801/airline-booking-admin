import { useState } from 'react'
import { Button, Col, Input, Menu, Row, Table, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import './FlyCancel.css'

const { Text } = Typography
const { Search } = Input

const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Đã xác nhận',
        key: 'yes'
    },
    {
        label: 'Chưa xác nhận',
        key: 'no'
    }
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name
    })
}
const FlyCancel = () => {
    const [current, setCurrent] = useState('mail')

    const onClick = (e) => {
        console.log('click ', e)
        setCurrent(e.key)
    }

    // eslint-disable-next-line no-unused-vars
    const [selectionType, setSelectionType] = useState('checkbox')
    const onSearch = (value, _e, info) => console.log(info?.source, value)

    const columns = [
        {
            title: 'Mã đặt vé',
            dataIndex: 'code',
            sorter: {
                compare: (a, b) => a.code - b.code,
                multiple: 1
            }
        },
        {
            title: 'Lý do',
            dataIndex: 'address',
            sorter: {
                compare: (a, b) => a.address - b.address,
                multiple: 1
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'address',
            sorter: {
                compare: (a, b) => a.address - b.address,
                multiple: 1
            }
        }
    ]

    const data = [
        {
            key: '1',
            code: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            code: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        }
    ]

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
                    <Button className='btn-confirm'>Xác nhận</Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                    {' '}
                    <Search
                        placeholder='Nhập mã đặt vé để tìm kiếm'
                        allowClear
                        enterButton='Tìm'
                        size='large'
                        onSearch={onSearch}
                        style={{
                            width: 350,
                            marginTop: 20,
                            marginRight: 20
                        }}
                    />
                </Col>
                <div className='table' style={{ marginTop: 20 }}>
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </Row>
        </div>
    )
}

export default FlyCancel
