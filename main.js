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
