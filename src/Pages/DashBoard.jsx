import React from 'react'
import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../Components/statuscard/StatusCard'
import Table from '../Components/table/Table'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
const chartOptions = {
    series: [{
        name: 'Orders',
        data: [40,70,20,90,36,80,30,91,60]
    }, {
        name: 'Cancel',
        data: [4, 3, 7, 8, 4, 6, 4, 20, 5, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}
const topCustomers = {
    head:[
        'user',
        'total orders',
        'total spending'
    ],
    body:
    [
        {
            "username": "john doe",
            "order": "490",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "250",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "120",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "110",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "80",
            "price": "$8,840"
        }
    ]
}
const renderCustomerHead = (item, index) =>{
    <th key = {index}>{item}</th>
}
const renderCustomerbody = (item, index) =>(
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)
const DashBoard = () => {
    return (
        <div>
            <h2 className="page-header">DashBoard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index)=>(
                                <div className="col-6">
                                    {item.title}
                                    <StatusCard
                                        icon = {item.icon}
                                        count = {item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>                   
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <Chart options={chartOptions.options}
                            series = {chartOptions.series}
                            type='line'
                            height='100%'/>
                    </div>      
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Top Customers</h3>
                        </div>
                        <div className="card-body">
                            <Table
                                headData = {topCustomers.head}
                                renderHead = {(item, index) => renderCustomerHead(item,index)}
                                bodyData = {topCustomers.body}
                                renderBody = {(item, index)=>renderCustomerbody(item, index)}
                            />
                        </div>
                        <div className="card-footer">
                            <Link to='/'>View all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
