const SERVER_NAME = "127.0.0.1:8000";
const postLogin = async (email, password) => {
    const apiPostLogin = "http://" + SERVER_NAME + "/login/";
    try {
      let response = await fetch(apiPostLogin, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.status === 200) {
        let responseJson = await response.json();
        return responseJson;
      } else return { status: response.status, data: null };
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  };
  async function getUserInformation( token) {
    const apiGetUserInformation = "http://" + SERVER_NAME + "/user/";
    try {
      let response = await fetch(apiGetUserInformation, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function getProduct() {
    const apiGetBanner = "http://" + SERVER_NAME + "/product/";
    try {
      let response = await fetch(apiGetBanner, {
        method: "GET",
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function getProductById(id) {
    const apiGetProductById =
      'http://' + SERVER_NAME + '/product/' + id + '/?IsActive=true';
    try {
      let response = await fetch(apiGetProductById, {
        method: 'GET',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function getDetailImage(id) {
    const apiGetProductById =
      'http://' + SERVER_NAME + '/img/?product='+ id;
    try {
      let response = await fetch(apiGetProductById, {
        method: 'GET',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }

  async function putProduct(id, product, img) {
      const apiPutProduct = "http://" + SERVER_NAME + "/product/" + id + "/";
      try {
        console.log(img);
        var form = new FormData();
        form.append('imagepresent', img);
        form.append('name', product.name);
        form.append('description', product.description);
        form.append('price', product.price);
        form.append('sold', product.sold);
        form.append('quantity', product.quantity);
        form.append('instruction', product.instruction);
        form.append('Ingredient', product.Ingredient);
        form.append('origin', product.origin);
        form.append('category', product.category);
        form.append('IsActive', product.IsActive);
        form.append('IsFlashsale', product.IsFlashsale);
        form.append('priceSale', product.priceSale);
        form.append('brand', product.brand);
    
        let response = await fetch(apiPutProduct, {
          method: "PUT",
          body: form,
        });
        return response.status;
      } catch (error) {
        console.error(`Error is: ${error}`);
      }
  }
  async function getAllCategory() {
    const apiGetAllCategory = 'http://' + SERVER_NAME + '/category/';
    try {
      let response = await fetch(apiGetAllCategory, {
        method: 'GET',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function putProductWithoutImg(id, product) {
    const apiPutUserInformation = "http://" + SERVER_NAME + "/product/" + id + "/";
    try {  
      let response = await fetch(apiPutUserInformation, {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
        sold: product.sold,
        quantity: product.quantity,
        instruction: product.instruction,
        Ingredient: product.Ingredient,
        origin: product.origin,
        IsActive: product.IsActive,
        category: product.category,
        priceSale: product.priceSale,
        IsFlashsale: product.IsFlashsale,
        brand: product.brand
      }),
      });
      return response.status;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
}

  async function deleteImageProduct(id) {
    const deleteImageProduct = 'http://'+ SERVER_NAME +'/img/' + id + '/';
    try {
      let response = await fetch(deleteImageProduct, {
        method: 'DELETE',
      });

      return true;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function postImageProduct(img, id) {
    const apiPostOrderDetail = 'http://'+ SERVER_NAME +'/img/';
    try {
      var form = new FormData();
      form.append('img', img);
      form.append('product', id);
      let response = await fetch(apiPostOrderDetail, {
        body: form,
        method: 'POST',
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function postAddProduct(product, img) {
    const apiPutProduct = "http://" + SERVER_NAME + "/product/";
    try {
      console.log(img);
      var form = new FormData();
      form.append('imagepresent', img);
      form.append('name', product.name);
      form.append('description', product.description);
      form.append('price', product.price);
      form.append('sold', product.sold);
      form.append('brand', product.brand);
      form.append('quantity', product.quantity);
      form.append('instruction', product.instruction);
      form.append('Ingredient', product.Ingredient);
      form.append('origin', product.origin);
      form.append('category', product.category);
      form.append('IsActive', product.IsActive);
      form.append('IsFlashsale', product.IsFlashsale);
      form.append('priceSale', product.priceSale);
  
      let response = await fetch(apiPutProduct, {
        method: "POST",
        body: form,
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
}
async function getDetailOrderInformation(id) {
  const apiGetDetailOrderInformation =
    "http://" + SERVER_NAME + "/detailorder/?order=" + id;
  try {
    let response = await fetch(apiGetDetailOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function putConfirmDelivery(id) {
  const apiPutConfirmDelivery = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let response = await fetch(apiPutConfirmDelivery, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: 4,
        dateReceive: date,
      }),
    });
    //let responseJson = await response.json();
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function putCanceDlelivery(id) {
  const apiPutConfirmDelivery = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let response = await fetch(apiPutConfirmDelivery, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: 5,
        cancellationReason: "Sản phẩm hết hàng",
      }),
    });

    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getOrderInformation() {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/order/?ordering=-id";
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function puConfirm(id, sta) {
  const apiAddAddress = 'http://'+ SERVER_NAME +'/order/' + id + '/';
  try {
    let response = await fetch(apiAddAddress, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: sta,
      }),
    });
    //let responseJson = await response.json();
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getOrderInformationById(id) {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getDeliveryInformationById(id) {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/delivery/" + id + "/";
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function putProductQuantity(id, quantity) {
  const apiPutUserInformation = "http://" + SERVER_NAME + "/product/" + id + "/";
  try {  
    let response = await fetch(apiPutUserInformation, {
      method: "PUT",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      quantity: quantity,
    }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getBanner() {
  const apiGetBanner = "http://" + SERVER_NAME + "/banner/";
  try {
    let response = await fetch(apiGetBanner, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function DeleteImageBanner(id) {
  const apiPostOrderDetail = 'http://'+ SERVER_NAME +'/banner/'+id+"/";
  try {
    
  let response = await fetch(apiPostOrderDetail, {
      method: 'DELETE',
    });

    return true;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function postAddBanner(img) {
  const apiPutProduct = "http://" + SERVER_NAME + "/banner/";
  try {
    console.log(img);
    var form = new FormData();
    form.append('image', img);
    
    let response = await fetch(apiPutProduct, {
      method: "POST",
      body: form,
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
export {postAddBanner, DeleteImageBanner ,getBanner, putProductQuantity, getOrderInformationById, getDeliveryInformationById, puConfirm, getOrderInformation, putCanceDlelivery, putConfirmDelivery, getDetailOrderInformation, postAddProduct, putProductWithoutImg, postImageProduct,deleteImageProduct,getAllCategory, putProduct,postLogin, getUserInformation, getProduct, getProductById, getDetailImage}