/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts'
import { Row, Col, Typography } from 'antd'
import { formatCurrency } from '../../../utils/format'

function EChartStatistics(props) {
    const { listRevenue } = props
    const { Title } = Typography
    const currentYear = new Date().getFullYear()
    const items = [
        {
            Title: `${
                listRevenue?.maxNumber === undefined ? formatCurrency(0) : formatCurrency(listRevenue?.maxNumber)
            }`,
            user: 'Tháng Cao Nhất'
        },
        {
            Title: `${
                listRevenue?.minNumber === undefined ? formatCurrency(0) : formatCurrency(listRevenue?.minNumber)
            }`,

            user: 'Tháng Thấp Nhất'
        },
        {
            Title: `${listRevenue?.medium === undefined ? formatCurrency(0) : formatCurrency(listRevenue?.medium)}`,

            user: 'Trung Bình Các Tháng'
        }
    ]
    const eChart = {
        series: [
            {
                name: `${currentYear}`,
                data: [
                    listRevenue?.January,
                    listRevenue?.February,
                    listRevenue?.March,
                    listRevenue?.April,
                    listRevenue?.May,
                    listRevenue?.June,
                    listRevenue?.July,
                    listRevenue?.August,
                    listRevenue?.September,
                    listRevenue?.October,
                    listRevenue?.November,
                    listRevenue?.December
                ],
                color: '#fff'
            }
        ],

        options: {
            chart: {
                type: 'bar',
                width: '100%',
                height: 'auto',

                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent']
            },
            grid: {
                show: true,
                borderColor: '#ccc',
                strokeDashArray: 2
            },
            xaxis: {
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
                ],
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: [
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff'
                        ]
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                    },
                    formatter: function (val) {
                        return formatCurrency(val)
                    }
                }
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

    return (
        <>
            <div id='chart'>
                <Title level={5} style={{ fontWeight: 700 }}>
                    Thống Kê Doanh Thu Từng Tháng Trong Năm
                </Title>
                <ReactApexChart
                    className='bar-chart'
                    options={eChart.options}
                    series={eChart.series}
                    type='bar'
                    height={220}
                />
            </div>
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

export default EChartStatistics
