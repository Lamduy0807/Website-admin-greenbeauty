import React, {useState, useEffect} from 'react'
import DropdownList from "react-widgets/DropdownList";
import { postAddProduct , getAllCategory, deleteImageProduct, postImageProduct , putProductWithoutImg} from "../../API/Network";
import { useParams } from "react-router-dom";
const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        des: "",
        price: "",
        quantity: 0,
        instruction: "",
        Ingredient: "",
        origin: "",
        sold: "0",
        priceSale: 0,
        brand: "",
        IsActive: false,
        IsFlashsale: false,
        imagepresent: "https://www.uit.edu.vn/sites/vi/files/resize/images/Logos/Logo_UIT_Web-218x261.png",
        category: 12
      });
      const [categories, setCategories] = useState([])
      const [imgPre, setimgPre] = useState();
      const [listImgNew, setListImgNew] = useState([]);
      const [listImg, setListImg] = useState([]);
      useEffect(() => {
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
            setListImg([...listImg, { img: reader.result} ]);
          }
        };
        setListImgNew([...listImgNew,{img: e.target.files[0]}]);
        reader.readAsDataURL(e.target.files[0]);
      }
    
      const handleDeleteImage = (img) =>{
            var arr = listImg
            arr = arr.filter(function(item) {
                return item.img !== img
            })
            setListImg(arr)
       }
      const handleAddProduct = (id) =>{
        // if(listImgNew.length>0)
        //   {
        //     listImgNew.forEach((item)=>{
        //       postImageProduct(item.img, id);
        //     })
        //   }
        // if(imgPre===undefined)  
        //   putProductWithoutImg(params.id, product).then(res=>{
        //     alert("sucess")
        //   })
        // else
        //   putProduct(params.id, product, imgPre).then(res=>{
        //     alert("sucess")
        // })
        if(imgPre===undefined)
            alert("Bạn nên thêm hình ảnh đại diện cho sản phẩm và hình ảnh chi tiết")
        else{
            postAddProduct(product, imgPre).then(res=>{
                listImgNew.forEach(item =>{
                    postImageProduct(item.img, res.id)
                })
                alert("success")
            })
        }
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
              <div className="register__form__realtive">
                <input
                  className="detailPro__content__input"
                  placeholder="Nhập số lượng sản phẩm trong kho"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                />
              </div>
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
              <div key={index} className="detailPro__listimg__img">
                <img
                  key={index}
                  src={item.img}
                  className="detailPro__listimg__img--img"
                />
                <div className="detailPro__listimg__img__round"
                  onClick={()=>{handleDeleteImage(item.img)}} >
                  <i className="bx bx-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="detailPro__button">
        <button className="detailPro__button__btn" 
         onClick={()=>handleAddProduct()}
        >CẬP NHẬT</button>
      </div>
    </div>
  )
}

export default AddProduct