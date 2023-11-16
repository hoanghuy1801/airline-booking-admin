/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts'
import { Typography } from 'antd'
import { MinusOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../../utils/format'

function LineChart(props) {
    // eslint-disable-next-line react/prop-types
    const { listRevenueInTwoYear } = props
    const { Title } = Typography
    const currentYear = new Date().getFullYear()
    const lineChart = {
        series: [
            {
                name: `${currentYear - 1}`,
                data: [
                    listRevenueInTwoYear?.yearOne?.January,
                    listRevenueInTwoYear?.yearOne?.February,
                    listRevenueInTwoYear?.yearOne?.March,
                    listRevenueInTwoYear?.yearOne?.April,
                    listRevenueInTwoYear?.yearOne?.May,
                    listRevenueInTwoYear?.yearOne?.June,
                    listRevenueInTwoYear?.yearOne?.July,
                    listRevenueInTwoYear?.yearOne?.August,
                    listRevenueInTwoYear?.yearOne?.September,
                    listRevenueInTwoYear?.yearOne?.October,
                    listRevenueInTwoYear?.yearOne?.November,
                    listRevenueInTwoYear?.yearOne?.December
                ],
                offsetY: 0
            },
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
    return (
        <>
            <div className='linechart'>
                <div>
                    <Title level={5}>API Hiện Thị Doanh Thu Từng Tháng Trả Dữ Liệu Hai Năm Ngần Nhất </Title>
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
        </>
    )
}

export default LineChart
