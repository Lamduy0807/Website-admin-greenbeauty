import React from 'react'
import './sidebar.css'
import logo1 from '../../assets/images/logo1.png'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import { Link } from 'react-router-dom'

const SidebarItem = props =>{
    const active = props.active? 'active' : ''
    return(
        <div className="sidebar_item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const SideBar = props => {
    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)

    return (
        <div className='sidebar'>
            <div className="sidebar_logo">
                <img src={logo1} alt="Greenbeauty logo" />
            </div>
            {
                sidebar_items.map((item, idex)=>(
                    <Link to={item.route} key={idex}>
                        <SidebarItem 
                        title={item.display_name}
                        icon={item.icon}
                        active={idex === activeItem}/>
                    </Link>
                ))
            }
        </div>
    )
}

export default SideBar
