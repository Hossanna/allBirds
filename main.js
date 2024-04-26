let api = `http://ecommerce.reworkstaging.name.ng/v2
`;
let userId;

$(document).ready(function () {
  $(".find").click(function () {
    $(".storeDropdown").toggle(".visible");
  });

  $(".dropdown1").click(function () {
    $(".dropdownContent1").toggle(".visible");
  });

  $(".dropdown2").click(function () {
    $(".dropdownContent2").toggle(".visible");
  });

  $(".dropdown3").click(function () {
    $(".dropdownContent3").toggle(".visible");
  });

  $(".dropdown4").click(function () {
    $(".dropdownContent4").toggle(".visible");
  });

  // Validation

  function validateNotEmpty(className) {
    if (!$("#" + className).val()) {
      $("#" + className).addClass("error");
      return false;
    } else {
      $("#" + className).removeClass("error");
      return true;
    }
  }

  function validateLength(className, length) {
    if ($("#" + className).val() != "") {
      if ($("#" + className).val().length < length) {
        $("#" + className).addClass("error");
        alert("password" + " must be at least " + length + " characters");
        return false;
      } else {
        $("#" + className).removeClass("error");
        return true;
      }
    }
  }

  function validateConfirmPassword() {
    if (
      $("#confirmPassword").val() != $("#regPassword").val() &&
      $("#confirmPassword").val() != ""
    ) {
      $("#confirmPassword").addClass("error");
      alert("confirm password must correspond with password");
    }
  }

  $("#register_button").click(function () {
    let nameValidated = validateNotEmpty("name");
    let lastnameValidated = validateNotEmpty("last_name");
    let registrationemailValidated = validateNotEmpty("reg_email");
    let registrationpasswordValidated = validateNotEmpty("regPassword");
    let confirmpasswordValidated = validateNotEmpty("confirmPassword");
    let registrationpasswordLengthValidated = validateLength("regPassword", 8);
    let validateconfirmPassword = validateConfirmPassword("confirmPassword");
  });

  $("#login_button").click(function () {
    let emailValidated = validateNotEmpty("email");
    let passwordValidated = validateNotEmpty("password");

    function validateNotEmpty(className) {
      if (!$("#" + className).val()) {
        $("#" + className).addClass("error");
        return false;
      } else {
        $("#" + className).removeClass("error");
        return true;
      }
    }
  });
});

// Create User

function handleUserSignup() {
  formObj = {
    first_name: $("#name").val(),
    last_name: $("#last_name").val(),
    email: $("#reg_email").val(),
    password: $("#regPassword").val(),
  };

  $.ajax({
    url: `${api}/users`,
    type: "post",
    data: formObj,
    success: function (res) {
      console.log(res.id);
      window.location.href = "./homepage.html";

      localStorage.setItem("usersId", res.id);
      userId = localStorage.getItem("usersId");
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// Login a user

function handleUserLogin() {
  formObj = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  $.ajax({
    url: `${api}/users/login`,
    type: "post",
    data: formObj,
    success: function (res) {
      console.log(res);
      if (res.msg != "Invalid username or password") {
        console.log(res.id);
        $("#email").val(""), $("#password").val("");
        window.location.href = "./homepage.html";

        localStorage.setItem("usersId", res.id);
        userId = localStorage.getItem("usersId");
        alert("Successfully logged in!");
      } else if ((res.msg = "Invalid username or password")) {
        alert("Wrong Email or password!");
      }
      console.log(userId);
    },
    error: function (err) {
      console.log(err);
      alert("Error!");
    },
  });
}

// get user id from local storage
function getUserIdFromLocalStorage() {
  return localStorage.getItem("usersId");
}
userId = getUserIdFromLocalStorage();
console.log(userId);

// Update a user

function handleUpdateUser() {
  console.log(userId);
  formObj = {
    first_name: $("#name").val(),
    last_name: $("#last_name").val(),
    email: $("#reg_email").val(),
    phone: $("#phone").val(),
  };

  $.ajax({
    url: `${api}/users/${userId}`,
    type: "put",
    data: formObj,
    success: function (res) {
      console.log(res.id);
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    },
  });
}



// How do I make sure that the update also takes effect during login (Override the previous info)?
