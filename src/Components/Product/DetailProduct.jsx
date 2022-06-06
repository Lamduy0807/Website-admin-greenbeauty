import React, { useEffect, useState } from "react";
import { putProduct,getProductById, getDetailImage, getAllCategory, deleteImageProduct, postImageProduct , putProductWithoutImg} from "../../API/Network";
import { useParams } from "react-router-dom";
import DropdownList from "react-widgets/DropdownList";

const DetailProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    des: "",
    price: "",
    quantity: "",
    instruction: "",
    Ingredient: "",
    origin: "",
    sold: "0",
    priceSale: 0,
    brand: "",
    IsActive: false,
    IsFlashsale: false,
    imagepresent: "http://127.0.0.1:8000/media/media/simple.jpg",
    category: 12
  });
  const [categories, setCategories] = useState([])
  const [imgPre, setimgPre] = useState();
  const [listImgNew, setListImgNew] = useState([]);
  const [listImg, setListImg] = useState([]);
  const params = useParams();
  useEffect(() => {
    getProductById(params.id).then((res) => {
      setProduct(res);
    });
    getDetailImage(params.id).then((res) => {
      setListImg(res);
    });
    getAllCategory().then(res=>{
      setCategories(res);
    })
  }, []);

  const handleUpdateFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProduct({ ...product, imagepresent: reader.result });
      }
    };
    setimgPre(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleUpdateFileToList = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setListImg([...listImg, {id: "-1", img: reader.result, file: e.target.files[0] } ]);
      }
    };
    setListImgNew([...listImgNew,{img: e.target.files[0]}]);
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleDeleteImage = (id, img, file) =>{
   if (window.confirm("Bạn có muốn xóa ảnh?"))
   {
     if(id === "-1")
        {
          var arr = listImg
          arr = arr.filter(function(item) {
                return item.img !== img
          })
          setListImg(arr)

          var arr2 = listImgNew
          arr2 = arr2.filter(function(item) {
            return item.img !== file
          })
        setListImgNew(arr2)
        }
    else
    {
      deleteImageProduct(id);
      var arr = listImg
            arr = arr.filter(function(item) {
                return item.img !== img
            })
      setListImg(arr)
    }
   }
  }
  const handleUpdateProduct = () =>{
    if(listImgNew.length>0)
      {
        listImgNew.forEach((item)=>{
          postImageProduct(item.img, params.id);
        })
      }
    if(imgPre===undefined)  
      putProductWithoutImg(params.id, product).then(res=>{
        alert("sucess")
      })
    else
      putProduct(params.id, product, imgPre).then(res=>{
        alert("sucess")
      })
  }
  return (
    <div className="detailPro">
      <div className="detailPro__container">
        <div className="detailPro__content">
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Tên sản phẩm: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập tên sản phẩm"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Giá: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập giá"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Danh mục: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <DropdownList
              dataKey="id"
              textField="name"
              value={product.category}
              onChange={(nextValue) => setProduct({...product, category: nextValue.id})}
              data={categories}
              />
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Đã bán: </span>
            </div>
            <div className="detailPro__content__infor--right">
              {product.sold}
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Số lượng kho: </span>
            </div>
            <div className="detailPro__content__infor--right">
              {product.quantity}
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Mô tả sản phẩm: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <textarea
                  className="detailPro__content__input1"
                  placeholder="Nhập mô tả"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Thành phần: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <textarea
                  className="detailPro__content__input1"
                  placeholder="Nhập thành phần"
                  value={product.Ingredient}
                  onChange={(e) =>
                    setProduct({ ...product, Ingredient: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Hướng dẫn sử dụng: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <textarea
                  className="detailPro__content__input1"
                  placeholder="Nhập hướng dẫn sử dụng"
                  value={product.instruction}
                  onChange={(e) =>
                    setProduct({ ...product, instruction: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Xuất xứ: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập xuất xứ"
                  value={product.origin}
                  onChange={(e) =>
                    setProduct({ ...product, origin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Brand: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập tên brand"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Is Active: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <input type="checkbox" checked={product.IsActive} onChange={()=> setProduct({...product, IsActive : !product.IsActive})} /> On
            </div>
          </div>

          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Is flashsale: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <input type="checkbox" checked={product.IsFlashsale} onChange={()=> setProduct({...product, IsFlashsale : !product.IsFlashsale})}/> On
            </div>
          </div>

          <div className="detailPro__content__infor marginBottom2">
            <div className="detailPro__content__infor--left">
              <span>Giá flashsale: </span>
            </div>
            <div className="detailPro__content__infor--right">
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập giá sale"
                  value={product.priceSale}
                  onChange={(e) =>
                    setProduct({ ...product, priceSale: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detailPro__image">
          <img src={product.imagepresent} className="detailPro__image--img" />
          <label
            htmlFor="upload-photo"
            className="detailPro__listimg__header--btn marginTop"
          >
            Chọn ảnh
          </label>
          <input
            type="file"
            id="upload-photo"
            onChange={handleUpdateFile}
            className="displaynone"
          ></input>
        </div>
      </div>
      <div className="detailPro__listimg">
        <div className="detailPro__listimg__header">
          <span className="detailPro__listimg__header--span">
            Hình ảnh chi tiết
          </span>
          <label htmlFor="upload-list-photo" className="detailPro__listimg__header--btn">Thêm ảnh</label>
          <input
            type="file"
            id="upload-list-photo"
            onChange={handleUpdateFileToList}
            className="displaynone"
          ></input>
        </div>
        <div className="detailPro__listimg__list">
          {listImg.map((item, index) => {
            return (
              <div className="detailPro__listimg__img">
                <img
                  key={index}
                  src={item.img}
                  className="detailPro__listimg__img--img"
                />
                <div className="detailPro__listimg__img__round"
                  onClick={()=>handleDeleteImage(item.id, item.img, item.file)} >
                  <i className="bx bx-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="detailPro__button">
        <button className="detailPro__button__btn" onClick={()=>handleUpdateProduct()}>CẬP NHẬT</button>
      </div>
    </div>
  );
};

export default DetailProduct;
