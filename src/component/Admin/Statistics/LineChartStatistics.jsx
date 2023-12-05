/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts'
import { Col, Row, Typography } from 'antd'
import { MinusOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../../utils/format'

function LineChartStatistics(props) {
    // eslint-disable-next-line react/prop-types
    const { listStatisticalTotalBooking, year } = props
    const { Title } = Typography
    const lineChart = {
        series: [
            {
                name: `${year}`,
                data: [
                    listStatisticalTotalBooking?.January,
                    listStatisticalTotalBooking?.February,
                    listStatisticalTotalBooking?.March,
                    listStatisticalTotalBooking?.April,
                    listStatisticalTotalBooking?.May,
                    listStatisticalTotalBooking?.June,
                    listStatisticalTotalBooking?.July,
                    listStatisticalTotalBooking?.August,
                    listStatisticalTotalBooking?.September,
                    listStatisticalTotalBooking?.October,
                    listStatisticalTotalBooking?.November,
                    listStatisticalTotalBooking?.December
                ],
                offsetY: 0
            }
        ],

        options: {
            chart: {
                width: '100%',
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                }
            },

            legend: {
                show: false
            },

            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },

            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 600,
                        colors: ['#8c8c8c']
                    }
                }
            },

            xaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 600,
                        colors: [
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c'
                        ]
                    }
                },
                categories: [
                    'Một',
                    'Hai',
                    'Ba',
                    'Bốn',
                    'Năm',
                    'Sáu',
                    'Bảy',
                    'Tám',
                    'Chín',
                    'Mười',
                    'Mười Một',
                    'Mười Hai'
                ]
            },

            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' Mã đặt vé'
                    }
                }
            }
        }
    }
    const items = [
        {
            Title: `${listStatisticalTotalBooking?.maxNumber} Mã Đặt Vé`,
            user: 'Tháng Cao Nhất'
        },
        {
            Title: `${listStatisticalTotalBooking?.minNumber} Mã Đặt Vé`,
            user: 'Tháng Thấp Nhất'
        },
        {
            Title: `${listStatisticalTotalBooking?.medium} Mã Đặt Vé`,
            user: 'Trung Bình Các Tháng'
        }
    ]
    return (
        <>
            <div className='linechart'>
                <div>
                    <Title level={5}>Hiện Thị Tổng Số Lượng Bán Vé </Title>
                </div>
                <div className='sales'>
                    <ul>
                        <li>
                            {<MinusOutlined />} {year}
                        </li>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className='full-width'
                options={lineChart.options}
                series={lineChart.series}
                type='area'
                height={350}
                width={'100%'}
            />
            <div className='chart-vistior'>
                <Row gutter>
                    {items.map((v, index) => (
                        <Col xs={6} xl={6} sm={6} md={6} key={index}>
                            <div className='chart-visitor-count'>
                                <Title level={4}>{v.Title}</Title>
                                <span>{v.user}</span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default LineChartStatistics
