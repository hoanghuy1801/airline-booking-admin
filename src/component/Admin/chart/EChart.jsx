/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts'
import { Row, Col, Typography } from 'antd'
import { formatCurrency } from '../../../utils/format'

function EChart(props) {
    const { listRevenueInTwoYear } = props
    const { Title } = Typography
    const currentYear = new Date().getFullYear()

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
    const eChart = {
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

export default EChart
