import React, {useEffect,useState } from 'react'
import Table from '../Components/table/Table'
import { getUserInformation } from '../API/Network'
const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'Birthday'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.orders}</td>
        <td>{item.dateofbirth}</td>
    </tr>
)

const Customers = () => {
    const [data, setData] = useState([])
    
    useEffect(()=>{
        try{
            const tokens = localStorage.getItem('token-admin')
            getUserInformation(tokens).then(res=>{
                setData(res)
            })

        }catch(error){
            console.log(`Error is ${error}`);
        }
    },[])

    return (
        <div>
            <h2 className="page__header">
                Customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={data}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
