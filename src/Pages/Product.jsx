import React, { useEffect, useState } from "react";
import TableProduct from "../Components/table/TableProduct";
import { getProduct } from "../API/Network";
import {  Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import DetailProduct from "../Components/Product/DetailProduct";
import {toSlug} from '../Function/Function'
import AddProduct from "../Components/Product/AddProduct";

const Product = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const customerTableHead = [
    "",
    "Tên",
    "Giá bán",
    "Đã bán",
    "Số lượng tồn",
    "Active",
    "On Deal",
    "brand",
  ];
  
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const handleRowClick = (item) => {
    console.log("histoty");
    history.push(`/products/${item.id}/${toSlug(item.name)}`)
  }
  const handleAddClick = () => {
    console.log("histoty");
    history.push(`/products/add-product`)
  }
  const renderBody = (item, index) => (
      <tr key={index} onClick={()=>handleRowClick(item)} className='cursor'>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price)}
        </td>
        <td>{item.sold}</td>
        <td>{item.quantity}</td>
        <td>{item.IsActive ? "True" : "False"}</td>
        <td>{item.IsFlashsale ? "On" : "Off"}</td>
        <td>{item.brand}</td>
      </tr>
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    getProduct().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div>
      <div className="page__header">
        <h2 className="page-header">Product</h2>
        <button className="classicButton" onClick={()=> handleAddClick()} >
          Thêm sản phẩm mới
        </button>
      </div>
      <Switch>
        <Route exact path={path}>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <TableProduct
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={data}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route path={`${path}/:id/:name`}>
          <DetailProduct />
        </Route>
        <Route path={`${path}/add-product`}>
          <AddProduct />
        </Route>
      </Switch>
    </div>
  );
};

export default Product;
