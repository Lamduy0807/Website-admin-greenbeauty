import React, { useEffect, useState } from "react";
import { getBanner, DeleteImageBanner, postAddBanner } from "../API/Network";
import ButtonSlider from "../Components/Banner/ButtonSlider";
const Banner = () => {
  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    getBanner().then((re) => {
      setBannerData(re);
    });
  };

  const [bannerData, setBannerData] = useState([]);
  const [newData, setNewData] = useState([])
  const [current, setCurrent] = useState(0);
  const length = bannerData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const moveDot = (index) => {
    setCurrent(index);
  };
  const handleUpdateFileToList = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBannerData([...bannerData, {id: "-1", image: reader.result, file: e.target.files[0] } ]);
      }
    };
    setNewData([...newData,{image: e.target.files[0]}]);
    reader.readAsDataURL(e.target.files[0]);
  }
  const handleUpdateProduct = () =>{
    if(newData.length>0)
      {
        newData.forEach((item)=>{
          postAddBanner(item.image).then(res=>{
            window.location.reload();
          })
        })
      }
  }
  const handleDeleteImage = (id, img, file) =>{
    if (window.confirm("Bạn có muốn xóa ảnh?"))
    {
      if(id === "-1")
         {
           var arr = bannerData
           arr = arr.filter(function(item) {
                 return item.image !== img
           })
           setBannerData(arr)
 
           var arr2 = newData
           arr2 = arr2.filter(function(item) {
             return item.image !== file
           })
         setNewData(arr2)
         }
     else
     {
       DeleteImageBanner(id);
       var arr3 = bannerData
       arr3 = arr3.filter(function(item) {
                 return item.image !== img
       })
       setBannerData(arr3)
     }
    }
   }
  return (
    <div>
      <h2 className="page__header">Banner</h2>
      <h3>Preview</h3>
      <div className="banner">
        <div className="banner__slider">
          {bannerData.map((img, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? "banner__slide active-anim"
                    : "banner__slide"
                }
              >
                {index === current && (
                  <img
                    className="banner__slide__img"
                    src={img.image}
                    alt={"banner" + index}
                    key={index}
                  />
                )}
              </div>
            );
          })}
          <ButtonSlider moveSlide={nextSlide} direction={"next"} />
          <ButtonSlider moveSlide={prevSlide} direction={"prev"} />
          <div className="banner__slider__dot">
            {bannerData.map((item, index) => {
              return (
                <div
                  onClick={() => moveDot(index)}
                  key={index}
                  className={
                    index === current
                      ? "banner__slider__dot-dot banner__slider__dot-dot-active"
                      : "banner__slider__dot-dot"
                  }
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="banner__middle">
        <h3>Detail Banner</h3>
        <label
          htmlFor="upload-list-photo"
          className="detailPro__listimg__header--btn"
        >
          Thêm ảnh
        </label>
        <input
          type="file"
          id="upload-list-photo"
          onChange={handleUpdateFileToList}
          className="displaynone"
        ></input>
      </div>
      <div className="banner__list">
        {bannerData.map((item, index) => {
          return (
            <div key={index+Math.random()} className="banner__list__image">
              <img
                key={index}
                src={item.image}
                className="banner__list__image--img"
              />
              <div
                className="detailPro__listimg__img__round"
                onClick={()=>handleDeleteImage(item.id, item.image, item.file)}
              >
                <i className="bx bx-x"></i>
              </div>
            </div>
          );
        })}
      </div>
        <div className="banner__footer">
            <button className="classicButton" onClick={()=>handleUpdateProduct()} >Update banner</button>
        </div>
    </div>
  );
};

export default Banner;
