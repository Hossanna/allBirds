let cartpage = $("#cart_page")
let fullPage = $("#fullpage")
let body = $("#body")
let productBody = $("#product_body")
let api = "http://ecommerce.reworkstaging.name.ng/v2"
let merchantID = "merchantID";


function showMenu(){
    let womenMenu = $("#dropdown-menu")
    womenMenu.fadeToggle(200)
    fullPage.toggleClass("dark-background");
}

function showProduct(){
    window.location.href = "./product.html"
}

function showCartPage() {
    cartpage.fadeIn(300)
    fullPage.addClass("dark-background");
    body.addClass("fixed_position")
    productBody.addClass("overflow")
}

function closeCartPage(){
    cartpage.fadeOut(300)
    fullPage.removeClass("dark-background");
    body.removeClass("fixed_position")
    productBody.removeClass("overflow")

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
    $("#regPassword").val("")

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
            instagram: $("#ig").val()
            
        },
        phones: $("#phones").val(),
    };

    let merchant = getMerchantId()

  
    $.ajax({
      type: "PUT",
      url: `${api}/merchants/${merchant.merchantID}`,
      data: submitObject,
      dataType: "json",
      success: function (response) {
        notYetSuccess(response, "Account updated successfully");
        console.log(response);

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

//get all categories for an existing user
function getCategories() {
  let { success, merchantID } = getMerchantId();
  if (success) {
    getMerchantCategories(merchantID);
  }
}

//render all categories
function addAllCategories(tagObjects) {
  let categoryListNode = $("#categoryList");
  let taskTagsListnodes = $("#taskTags");

  categoryListNode.empty();
  taskTagsListnodes.empty();

  tagObjects.forEach((tagObject) => {
    let name = tagObject.name;
    let id = tagObject.id;
    
    categoryListNode.append(
      `<li id=${id}> ${name} </li>`
        

        // `<div class="showInfoDelete showInfoDelete-${id}">
        //   <p class="deleteTag" id=${id}> Delete tag </p>
        //   <p class="TagInfo ${newDateAndTime}" id=${id}>Tag Info </p>
        // </div>` 
// <i class="fa fa-trash " id=${id} aria-hidden="true"></i> 
    );

    // taskTagsListnodes.append(`<option value=${id}> ${name} </option>`);
  });

  // return dateAndTime
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
  // getTasks();
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

  if (checkTagIfEmpty(id)){
    if (confirm("Do you want to delete this category?")){
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
  }
  else{
    alert("This category is not empty")
  }
});

// check if tag is empty before deleting
function checkTagIfEmpty(tagID) {
  let tagIsEmpty = false
  $.ajax({
    type: "get",
    url: `${api}/tags/tasks?tag_id=${tagID}`,
    // data: "data",
    async: false,
    dataType: "json",
    success: function (response) {
      tagIsEmpty = response.length === 0
    },
    error: function (err) {
      alert(err);
    },
  });
  return tagIsEmpty
}

//get existing tasks for a user
function getUserTasks(id) {
  $.ajax({
    type: "get",
    url: `${api}/tasks?user_id=${id}`,
    // data: "data",
    dataType: "json",
    success: function (response) {
      // console.log(response);
      addAllTasks(response);
    },
    error: function (err) {
      alert(err);
    },
  });
}

//get tasks for an existing user
function getTasks() {
  let { success, userID } = getUserId();
  if (success) {
    getUserTasks(userID);
  }
}

function getTasksForTag(tagID) {
  $.ajax({
    type: "get",
    url: `${api}/tags/tasks?tag_id=${tagID}`,
    // data: "data",
    dataType: "json",
    success: function (response) {
      // console.log(response);
      response.forEach((task) => {
        task.tag = tagIdToName[tagID];
      });
      addAllTasks(response);
    },
    error: function (err) {
      alert(err);
    },
  });
}
//when retrieving tasks for tags, the task has no tag name and tag id

//selected tags tasks
$("#categoryList").on("click", ".selectedTag", function (e) {
  e.preventDefault();
  let id = e.target.id;
  // console.log(id);
  getTasksForTag(id);
});

//render all tasks
function addAllTasks(tasksObjects) {
  let taskListNode = $("#mainTasks");
  taskListNode.empty();

  let hiddenDoneTasks = $("#hiddenTasks").is(":checked");
  // console.log(hiddenDoneTasks);

  tasksObjects.forEach((tasksObject) => {
    let title = tasksObject.title;
    let description = tasksObject.content;
    let checked = "";
    let line = checked;
    if (tasksObject.completed) {
      checked = "checked";
      line = "line";
    }

    if (tasksObject.completed && hiddenDoneTasks) {
      return;
    }

    let id = tasksObject.id;
    let color = tagNameToColor[tasksObject.tag];
    // console.log(color);
    taskIdToNameAndContent[id] = {
      title: title,
      content: description,
    };

    taskListNode.append(
      `<div class="grid-items"> 
                <div class="flex space-between">
                    <h2 class = "${line}"> ${title} </h2>
                    <h2 class="ed" id=${id}>...</h2>
                </div>
                <div class="showED showED-${id}">
                        <p class="editTask" id=${id}>Edit</p>
                        <p class="deleteTask" id=${id}>Delete</p>
                </div>
                <p class="desc ${line}"> ${description} </p>
                <div class="small-circles circles" style="background: ${color}"></div>
                <div class="checkbox">
                    <input ${checked} id=${id} class="done-check" type="checkbox" name="done">
                    <p>Done</p>
                </div>
            </div>`
    );
  });
}
