import React, {useState, useEffect} from "react";
import TableProduct from "../Components/table/TableProduct";
import { getProduct , putProductQuantity} from "../API/Network";
import DropdownList from "react-widgets/DropdownList";

const customerTableHead = ["", "Tên", "Số lượng tồn", "Active", "On Deal"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td className={item.quantity <= 50 ? "colorRed" : ""}>{item.quantity}</td>
    <td>{item.IsActive ? "True" : "False"}</td>
    <td>{item.IsFlashsale ? "On" : "Off"}</td>
  </tr>
);
const Inventory = () => {
  const [proID, setProID] = useState(1)
  const [quantity, setQuantity] = useState(0)
  const [preQuan, setPreQuan] = useState(0)
  const [isShow,setIsShow] = useState(false)
  const [data, setData] = useState([]);
  useEffect(() => {
    getProduct().then((res) => {
      setData(res);
    });
  }, []);
  const handleImport = () =>{
    putProductQuantity(proID, parseInt(preQuan)+parseInt(quantity)).then(res=>{
      if(res===200)
      {
        setIsShow(false);
        window.location.reload();
      }
    })
  }
  return (
    <div className="relative">
      <div className={isShow?"inven" : "displaynone"}>
        <div className="inven__container">
        <h2 className="page-header" >Nhập hàng</h2>
        <div className="inven__dropdown">
          <DropdownList
              dataKey="id"
              textField="name"
              placeholder="Chọn sản phẩm nhập hàng"
              onChange={(nextValue) => {setProID(nextValue.id); setPreQuan(nextValue.quantity);}}
              data={data}
              />
        </div>
        <div style={{width:"100%"}} className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Số lượng kho: </span>
            </div>
            <div className="detailPro__content__infor--right">
              {preQuan}
            </div>
          </div>
          <div style={{width:"100%"}} className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Số lượng thêm: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập số lượng thêm"
                  onChange={(e) =>
                    setQuantity( e.target.value )
                  }
                />
              </div>
            </div>
          </div>
          <div style={{width:"100%", padding:"0 2rem"}} className="detailPro__content__infor marginBottom2">
              <button className="classicButton1" onClick={()=>{handleImport()}} >Nhập hàng</button>
          </div>
          <div style={{width:"100%", padding:"0 2rem"}} className="detailPro__content__infor marginBottom2">
              <button onClick={()=> setIsShow(false)} className="classicButton2">Hủy</button>
          </div>
        </div>
      </div>
      <div className="page__header">
        <h2 className="page-header">Inventory</h2>
        <button className="classicButton" onClick={()=>{setIsShow(true)}}>
          Nhập hàng
        </button>
      </div>
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

export default Inventory;
