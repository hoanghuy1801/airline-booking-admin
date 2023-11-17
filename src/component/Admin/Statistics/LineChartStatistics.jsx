/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts'
import { Col, Row, Typography } from 'antd'
import { MinusOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../../utils/format'

function LineChartStatistics(props) {
    // eslint-disable-next-line react/prop-types
    const { listRevenueInTwoYear } = props
    const { Title } = Typography
    const currentYear = new Date().getFullYear()
    const lineChart = {
        series: [
            {
                name: `${currentYear}`,
                data: [
                    listRevenueInTwoYear?.yearTwo?.January,
                    listRevenueInTwoYear?.yearTwo?.February,
                    listRevenueInTwoYear?.yearTwo?.March,
                    listRevenueInTwoYear?.yearTwo?.April,
                    listRevenueInTwoYear?.yearTwo?.May,
                    listRevenueInTwoYear?.yearTwo?.June,
                    listRevenueInTwoYear?.yearTwo?.July,
                    listRevenueInTwoYear?.yearTwo?.August,
                    listRevenueInTwoYear?.yearTwo?.September,
                    listRevenueInTwoYear?.yearTwo?.October,
                    listRevenueInTwoYear?.yearTwo?.November,
                    listRevenueInTwoYear?.yearTwo?.December
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
                    },
                    formatter: function (val) {
                        return formatCurrency(val)
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
                        return formatCurrency(val)
                    }
                }
            }
        }
    }
    const items = [
        {
            Title: `${
                listRevenueInTwoYear?.yearTwo?.maxNumber === undefined
                    ? formatCurrency(0)
                    : formatCurrency(listRevenueInTwoYear?.yearTwo?.maxNumber)
            }`,
            user: 'Tháng Cao Nhất'
        },
        {
            Title: `${
                listRevenueInTwoYear?.yearTwo?.minNumber === undefined
                    ? formatCurrency(0)
                    : formatCurrency(listRevenueInTwoYear?.yearTwo?.minNumber)
            }`,

            user: 'Tháng Thấp Nhất'
        },
        {
            Title: `${
                listRevenueInTwoYear?.yearTwo?.medium === undefined
                    ? formatCurrency(0)
                    : formatCurrency(listRevenueInTwoYear?.yearTwo?.medium)
            }`,

            user: 'Trung Bình Các Tháng'
        }
    ]
    return (
        <>
            <div className='linechart'>
                <div>
                    <Title level={5}>API Hiện Thị Tổng Số Lượng Bán Vé </Title>
                </div>
                <div className='sales'>
                    <ul>
                        <li>
                            {<MinusOutlined />} {currentYear - 1}
                        </li>
                        <li>
                            {<MinusOutlined />} {currentYear}
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
