let cartpage = $("#cart_page");
let fullPage = $("#fullpage");
let body = $("#body");
let productBody = $("#product_body");
let api = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantID = "merchantID";

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
        $("#email").val(""), $("#password").val("");
        window.location.href = "./shopMerchant.html";
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
      $("#state").append(response.state);
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
function getUserCategories(id) {
  $.ajax({
    type: "get",
    url: `${api}/tags?user_id=${id}`,
    dataType: "json",
    success: function (res) {
      addAllCategories(res);
    },
    error: function (err) {
      alert(err.responseJSON.msg);
    },
  });
}

//get all categories for an existing user
function getCategories() {
  let { success, userID } = getUserId();
  if (success) {
    getUserCategories(userID);
  }
}

//render all categories
function addAllCategories(tagObjects) {
  let categoryListNode = $("#categoryList");
  let taskTagsListnodes = $("#taskTags");
  let firstAddTodoButton = $("#firstAddTodoButton");

  categoryListNode.empty();
  taskTagsListnodes.empty();

  let isTagObjEmpty = tagObjects.length === 0;
  if (isTagObjEmpty) {
    firstAddTodoButton.attr("disabled", true);
    firstAddTodoButton.addClass("addtodo-disabled");
  } else {
    firstAddTodoButton.attr("disabled", false);
    firstAddTodoButton.removeClass("addtodo-disabled");
  }
  // console.log(isTagObjEmpty);
  tagObjects.forEach((tagObject) => {
    // let color = tagObject.color;
    let name = tagObject.title;
    let id = tagObject.id;
    let dateAndTime = tagObject.created_at;

    let newDateAndTime = new Date(dateAndTime).toLocaleString();

    // tagNameToColor[name] = color;
    tagIdToName[id] = name;
    tagIdToDate[id] = newDateAndTime;
    //names have to be unique else it will override!! return the id

    categoryListNode.append(
      `<div class="p">` +
        `<div class="circles selectedTag" id=${id}  style="background: ${color}">` +
        "</div>" +
        `<div class="div" id=${id}>${name}</div>` +
        `<h2 class="ed" id=${id}>...</h2>` +
        "</div>" +
        `<div class="showInfoDelete showInfoDelete-${id}">
          <p class="deleteTag" id=${id}> Delete tag </p>
          <p class="TagInfo ${newDateAndTime}" id=${id}>Tag Info </p>
        </div>`
      // <i class="fa fa-trash " id=${id} aria-hidden="true"></i>
    );

    taskTagsListnodes.append(`<option value=${id}> ${name} </option>`);
  });

  // return dateAndTime
}

//add new category
function addNewCategory() {
  if (!$("#category").val()) {
    alert("Please add a category ");
  } else {
    let { success, userID } = getUserId();
    if (success) {
      let submitObject = {
        user_id: userID,
        title: $("#category").val(),
        // color: $("#color").val(),
      };

      $.ajax({
        type: "post",
        url: `${api}/tags`,
        data: submitObject,
        dataType: "json",
        success: function (res) {
          getUserCategories(userID);
        },
        error: function (err) {
          alert(err.responseJSON.msg);
        },
      });
    }
    $("#category").val("");
  }
}

//show delete and info menu for tags
$("#categoryList").on("click", ".ed", function (e) {
  e.preventDefault();
  let id = e.target.id;
  // console.log(id);
  $(`.showInfoDelete-${id}`).toggle();
});

//delete category
$("#categoryList").on("click", ".deleteTag", function (e) {
  e.preventDefault();
  let id = e.target.id;
  // console.log(e, id);

  if (checkTagIfEmpty(id)) {
    if (confirm("Do you want to delete this category?")) {
      $.ajax({
        type: "delete",
        url: `${api}/tags/${id}`,
        dataType: "json",
        success: function (response) {
          // alert(`deleted tag and its tasks`)
          getTagsAndTasks();
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
  return tagIsEmpty;
}
