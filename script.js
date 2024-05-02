let cartpage = $("#cart_page");
let fullPage = $("#fullpage");
let body = $("#body");
let productBody = $("#product_body");
let api = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantID = "merchantID";
const singleMerchantID  = "6628cdeaf7192e0c5d70043e"
let tagIdToName = {};
let taskIdToNameAndContent = {};



function showMenu() {
  let womenMenu = $("#dropdown-menu");
  womenMenu.fadeToggle(200);
  fullPage.toggleClass("dark-background");
}

function showProduct() {
  window.location.href = "./product.html";
}

function showCartPage() {
  cartpage.fadeIn(300);
  fullPage.addClass("dark-background");
  body.addClass("fixed_position");
  productBody.addClass("overflow");
}

function closeCartPage() {
  cartpage.fadeOut(300);
  fullPage.removeClass("dark-background");
  body.removeClass("fixed_position");
  productBody.removeClass("overflow");
}

//signup for merchant
$("#register_button").click(function (e) {
  e.preventDefault();

  let submitObject = {
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    email: $("#reg_email").val(),
    password: $("#regPassword").val(),
  };

  $.ajax({
    type: "post",
    url: `${api}/merchants`,
    data: submitObject,
    dataType: "json",
    success: function (res) {
      notYetSuccess(res, "Merchant Account created successfully");
    },
    error: function (err) {
      alert(err.responseJSON.msg);
    },
  });

  $("#first_name").val(""),
    $("#last_name").val(""),
    $("#reg_email").val(""),
    $("#regPassword").val("");
});

//login for merchant
$("#login_button").click(function (e) {

    e.preventDefault();
  
    let submitObject = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
  
    $.ajax({
      type: "post",
      url: `${api}/merchants/login`,
      data: submitObject,
      dataType: "json",
      success: function (res) {
        let { success, response } = notYetSuccess(res, "Login successful");
        if (success) {
          storeMerchantId(response.id);
          $("#email").val(""),
          $("#password").val("")
          window.location.href = "./MerchantDashboard.html";
        } else if ((res.msg = "Invalid username or password")) {
          alert("Wrong Email or password!");
        }
      },
      error: function (err) {
        alert(err.responseJSON.msg);
      },
    });

  });


function notYetSuccess(res, message) {
  if (typeof res.code === "undefined" || res.code === 200) {
    alert(message);
    return {
      success: true,
      response: res,
    };
  } else {
    //   alert(res.msg);
    return {
      success: false,
      response: {},
    };
  }
}

function storeMerchantId(id) {
  localStorage.setItem(merchantID, id);
}

function clearMerchantId() {
  localStorage.removeItem(merchantID);
}

function getMerchantId() {
  let foundId = localStorage.getItem(merchantID);
  return {
    success: foundId !== null,
    merchantID: foundId,
  };
}

//update merchant details
$("#update_merchant").click(function (e) {
  e.preventDefault();

  let submitObject = {
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    store_name: $("#store_name").val(),
    descp: $("#descp").val(),
    icon: $("#icon").val(),
    banner: $("#banner").val(),
    state: $("#state").val(),
    district: $("#district").val(),
    social_media: {
      x: $("#x").val(),
      face_book: $("#fb").val(),
      instagram: $("#ig").val(),
    },
    phones: $("#phones").val(),
  };

  let merchant = getMerchantId();

  $.ajax({
    type: "PUT",
    url: `${api}/merchants/${merchant.merchantID}`,
    data: submitObject,
    dataType: "json",
    success: function (response) {
      notYetSuccess(response, "Account updated successfully");
      console.log(response);
      $("#onSuccess")
        .append("h3" + "UPDATED ADMIN DETAILS" + "h3" + response.first_name)
      $("#first-name").append(response.first_name);
      $("#last-name").append(response.last_name);
      // $("#state").append(response.state);
      $("#success_district").append(response.district);
      $("#store-name").append(response.store_name);
      $("#description").append(response.descp);
      $("#success_phone").append(response.phones);

    },
    error: function (err) {
      alert(err.responseJSON.msg);
    },
  });
});


// Update Merchant Password
function handleUpdateAdminPassword() {

  let merchant = getMerchantId();

  formObj = {
    old_password: $("#oldPassword").val(),
    new_password: $("#newPassword").val(),
  };

  $.ajax({
    url: `${api}/merchants/${merchant.merchantID}/change-passwd`,
    type: "PUT",
    data: formObj,
    success: function (res) {
      notYetSuccess(res, "Password updated successfully");
      console.log(res.id);
      console.log(res);
      $("#oldPassword").val("");
      $("#newPassword").val("");
    },
    error: function (err) {
      console.log(err);
    },
  });
}

//show add todo menu
function addTodo() {
  $("#showaddtodo").show();
  $("#cancel").click(function (e) {
    e.preventDefault();
    $("#showaddtodo").hide();
    $("#entirepage").removeClass("backgroundChange");

    $("#addnewtodo").val("");
    $("#description").val("");
  });

  $("#entirepage").addClass("backgroundChange");
}

//show add category menu
function addCategory() {
  $("#showaddcategory").show();
  $("#cancell").click(function (e) {
    e.preventDefault();
    $("#showaddcategory").hide();
    $("#entirepage").removeClass("backgroundChange");
  });

  $("#entirepage").addClass("backgroundChange");
}

  //get existing categories for a merchant
function getMerchantCategories(id) {
  $.ajax({
    type: "get",
    url: `${api}/categories?merchant_id=${id}`,
    dataType: "json",
    success: function (res) {
      addAllCategories(res);
    },
    error: function (err) {
      alert(err.responseJSON.msg);
    },
  });
}

//get all categories for an existing merchant
function getCategories() {
  let { success, merchantID } = getMerchantId();
  if (success) {
    getMerchantCategories(merchantID);
  }
}

//render all categories
function addAllCategories(tagObjects) {
  let categoryListNode = $("#categoryList");
  let pageCategoryListNode = $("#pageCategoryList");
  let taskTagsListnodes = $("#taskTags");

  // let isTagObjEmpty = tagObjects.length  === 0
  


  pageCategoryListNode.empty()
  categoryListNode.empty();
  taskTagsListnodes.empty();

  tagObjects.forEach((tagObject) => {
    let name = tagObject.name;
    let id = tagObject.id;
    let dateAndTime = tagObject.created_at;

    tagIdToName[id] = name;
    let newDateAndTime = new Date(dateAndTime).toLocaleString()
    taskIdToNameAndContent[id] = {
      name: name,
    };


    categoryListNode.append(
      `<tr ${id}> 
          <td>${name}</td>
          <td>${newDateAndTime}</td>
          <td class="editTag">Edit</td>
          <td class="deleteTag">Delete</td>

      </tr>`        
    );

    pageCategoryListNode.append(
      `<li id=${id}> ${name} </li>` 
    );

    taskTagsListnodes.append(
      `<option value=${id}> ${name} </option>`
    );

  });

}

//add new category
function addNewCategory() {
  if (!$("#category").val()) {
    alert("Please add a category ");
  } else {
    let { success, merchantID } = getMerchantId();
    if (success) {
      let submitObject = {
        merchant_id: merchantID,
        name: $("#category").val(),
        // color: $("#color").val(),
      };

      $.ajax({
        type: "post",
        url: `${api}/categories`,
        data: submitObject,
        dataType: "json",
        success: function (res) {
          getMerchantCategories(merchantID);
        },
        error: function (err) {
          alert(err.responseJSON.msg);
        },
      });
    }
    $("#category").val("");
  }
}


//get all tasks and categories
function getCategoriesAndProducts() {
  getCategories();
  getProducts();
}


////////////////////

//open edit todo menu
$("#mainTasks").on("click", ".editCategory", function (e) {
  let task = taskIdToNameAndContent[e.target.id];
  $(".editTodoButton").attr("id", e.target.id);
  $("#showeditodo").show();
  $("#entirepage").addClass("backgroundChange");

  $("#edittodo").val(`${task.title}`);
  // $("#editdescription").val(`${task.content}`);

  $("#canceledit").click(function (e) {
    e.preventDefault();
    $("#showeditodo").hide();
    $("#entirepage").removeClass("backgroundChange");

    $("#edittodo").val("");
    // $("#editdescription").val("");
  });
});

//edit categories
function editTodo() {
  let id = $(".editTodoButton").attr("id");
  // console.log(id);
  let submitObject = {
    name: $("#edittodo").val(),
    // content: $("#editdescription").val(),
  };
  $.ajax({
    type: "put",
    url: `${api}/categories/${id}`,
    dataType: "json",
    data: submitObject,
    success: function (response) {
      getCategories();
    },
  });
}

//delete category
$("#categoryList").on("click", ".deleteTag", function (e) {
  e.preventDefault();
  let id = e.target.id;
  // console.log(e, id);

  if (checkTagIfEmpty(id)) {
    if (confirm("Do you want to delete this category?")) {
      $.ajax({
        type: "delete",
        url: `${api}/categories/${id}`,
        dataType: "json",
        success: function (response) {
          // alert(`deleted tag and its tasks`)
          getCategoriesAndProducts();
        },
      });
    }
  } else {
    alert("This category is not empty");
  }
});

// check if tag is empty before deleting
function checkTagIfEmpty(tagID) {
  let tagIsEmpty = false;
  $.ajax({
    type: "get",
    url: `${api}/tags/tasks?tag_id=${tagID}`,
    // data: "data",
    async: false,
    dataType: "json",
    success: function (response) {
      tagIsEmpty = response.length === 0;
    },
    error: function (err) {
      alert(err);
    },
  });
  return tagIsEmpty
}

// get product for each category
function getProductsForTag(tagID, merchantID) {
  $.ajax({
    type: "get",
    url: `${api}/products?merchant_id=${merchantID}&category_id=${tagID}`,
    // data: "data",
    dataType: "json",
    success: function (response) {
      // console.log(response);
      response.forEach((product) => {
        product.tag = tagIdToName[tagID];
      });
      addAllProducts(response);
    },
    error: function (err) {
      alert(err);
    },
  });
}

// render selected category products
$("#categoryList").on("click", ".selectedTag", function (e) {
  e.preventDefault();
  let id = e.target.id;
  // console.log(id);
  getProductsForTag(id);
});

///////////////////


//get existing products for a merchant
function getMerchantProducts(id) {
  $.ajax({
    type: "get",
    url: `${api}/products?merchant_id=${id}`,
    // data: "data",
    dataType: "json",
    success: function (response) {
      console.log(response);
      addAllProducts(response);
    },
    error: function (err) {
      alert(err);
    },
  });
}

//get products for an existing merchant
function getProducts() {
  let { success, merchantID } = getMerchantId();
  if (success) {
    getMerchantProducts(merchantID);
  }
}

//render all products
function addAllProducts(productsObjects) {
  let productListNode = $("#productList");
  let pageProductListNode = $("#pageProductList");

  
  productListNode.empty();
  pageProductListNode.empty();

  productsObjects.data.forEach((productsObject) => {
    let title = productsObject.title;
    let description = productsObject.descp;
    let price = productsObject.price;
    let brand = productsObject.brand;
    let quantity = productsObject.quantity;
    let currency = productsObject.currency;
    let max = productsObject.max_qty;
    let min = productsObject.min_qty;
    let discount = productsObject.discount;
    let discount_expiration = productsObject.discount_expiration;
    let hasVariation = productsObject.has_variation;
    let hasRefundPolicy = productsObject.has_refund_policy;
    let hasShipment = productsObject.has_shipment;
    let hasDiscount = productsObject.has_discount;

    let id = productsObject.id;

    // taskIdToNameAndContent[id] = {
    //   title: title,
    //   descp: description,
    // };

    productListNode.append(

      `<tr ${id}> 
      <td>${title}</td>
      <td>${price}</td>
      <td class="editTag">Edit</td>
      <td class="deleteTag">Delete</td>

      </tr>`        
      );


      // pageProductListNode.append(
      //   `<li id=${id}> ${title} </li>` 
      // );

  });
}

// post new product
function addNewProduct() {
  if (!$("#addnewtodo").val()) {
    alert("Please add product details");
  }  else {

    let shipping_locations = $("#shipping_location").val()
    let { success, merchantID } = getMerchantId();

    if (success) {
      let submitObject = {
        category_id: $("#taskTags").val(),
        image: $("#fileInput").val(),
        title: $("#addnewtodo").val(),
        descp: $("#description").val(),
        price: $("#product_price").val(),
        brand: $("#product_brand").val(),
        quantity: $("#product_qty").val(),
        currency: $("#currency").val(),
        max_qty: $("#max_qty").val(),
        min_qty: $("#min_qty").val(),
        discount: $("#discount").val(),
        discount_expiration: $("#discount_expiration").val(),
        has_refund_policy: $("#refund_policy").val(),
        has_discount: $("#has_discount").val(),
        has_shipment: $("#has_shipment").val(),
        has_variation: $("#has_variation").val(),
        shipping_locations: [],
        attrib: [{
          type: "",
          content: [
            {
              name: "",
              value: ""
            }
          ]
        }],

        // category_id: tag_id,
        merchant_id: merchantID

      };
      
      // console.log(submitObject);
      // console.log(shipping_locations);

      $.ajax({
        type: "post",
        url: `${api}/products`,
        data: submitObject,
        dataType: "json",
        success: function (res) {
          getMerchantProducts(merchantID);
          console.log(res);
          // console.log(merchantID);
          // console.log(category_id);
          
        },
        error: function (err) {
          alert(err.responseJSON.msg);
          
        },
      });
    }
    // $("#addnewtodo").val("");
    // $("#description").val("");
  }
}

//log out
$("#logOut").click(function (e) {
  e.preventDefault();
  clearMerchantId();
  window.location.href = "./index.html";
});

//log In
$("#logIn").click(function (e) {
  e.preventDefault();
  clearMerchantId();
  window.location.href = "./index.html";
});


//handleImageUpload();
  $("#uploadBtn").click(function () {
    var id = "234050273";
    var fileInput = $("#fileInput")[0].files;
    var formData = new FormData();

    formData.append("id", id);
    //formData.append('image', fileInput);

    for (var i = 0; i < fileInput.length; i++) {
      formData.append("image", fileInput[i]);
    }

    $.ajax({
      url: "http://bucket.reworkstaging.name.ng/resources",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#response").text(response);
        console.log(response);
      },

      error: function () {
        $("#response").text("Error uploading image.");
      },
    });
  });


