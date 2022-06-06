import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashBoard from '../Pages/DashBoard'
import Customer from '../Pages/Customer'
import Product from '../Pages/Product'
import Inventory from '../Pages/Inventory'
import OrderManage from '../Pages/OrderManage'
import DetailOrder from '../Pages/DetailOrder'
import FlashSale from "../Pages/FlashSale"
import Banner from "../Pages/Banner";
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={DashBoard}/>
            <Route path='/customers' component={Customer}/>
            <Route path='/products'>
                <Product/>
            </Route>
            <Route path='/inventory' component={Inventory} />
            <Route path='/orders/detail/:id' component={DetailOrder} />
            <Route path='/orders' component={OrderManage}/>
            <Route path='/flash-sale' component={FlashSale}/> 
            <Route path='/banners' component={Banner}/>            
        </Switch>
    )
}

export default Routes
