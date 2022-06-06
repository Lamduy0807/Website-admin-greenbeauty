import React, { useState, useEffect } from "react";
import TableProduct from "../Components/table/TableProduct";
import { getProduct } from "../API/Network";
import { toSlug } from "../Function/Function";
import { useHistory } from "react-router-dom";

const FlashSale = () => {
  const [data, setData] = useState([]);

  const customerTableHead = [
    "",
    "Tên",
    "Hoạt động",
    "On Deal",
    "Giá gốc",
    "Giá giảm",
  ];
  const history = useHistory();
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const handleRowClick = (item) => {
    history.push(`/products/${item.id}/${toSlug(item.name)}`);
  };
  const renderBody = (item, index) => (
    <tr key={index} onClick={()=>handleRowClick(item)} className='cursor'>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.IsActive ? "True" : "False"}</td>
      <td className={item.IsFlashsale ? "colorRed" : ""}>
        {item.IsFlashsale ? "Flash Sale" : ""}
      </td>
      <td>
        {Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item.price)}
      </td>
      <td className="colorRed">
        {item.IsFlashsale
          ? Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.priceSale)
          : null}{" "}
      </td>
    </tr>
  );

  useEffect(() => {
    getProduct().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div>
      <h2 className="page__header">Inventory</h2>
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
    </div>
  );
};

export default FlashSale;
