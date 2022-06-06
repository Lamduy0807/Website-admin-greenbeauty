import React from 'react'
import './topnav.css'
import Dropdown from '../dropdown/Dropdown'
import notifications from '../../assets/JsonData/notification.json'
import { Link } from 'react-router-dom'
const renderNotificationItem = (item, index) =>(
    <div className="notification_item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const TopNav = () => {
    return (
        <div className="topnav">
            <div className="topnav_search">
                <input type="text" placeholder="Search here..."/>
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav_right">
                <div className="topnav_right-item">
                    <Dropdown
                    icon = 'bx bx-user'

                    />
                </div>
                <div className="topnav_right-item">
                    <Dropdown
                    icon = "bx bx-bell"
                    badge = '12'
                    contentData = {notifications}
                    renderItems = {(item, index)=>renderNotificationItem(item, index)}
                    renderfooter = {()=> <Link to= '/' >View all</Link>}
                     />
                </div>
                <div className="topnav_right-item">
                    <Dropdown/>
                </div>
            </div>
        </div>
    )
}

export default TopNav
