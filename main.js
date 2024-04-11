// $(document).ready(function () {
//   $(".show").click(function () {
//     ".show".toggle(".dropdownContent3");
//   });
// });

// let dropdownContent = document.getElementsByClassName("dropdownContent3");

// dropdownContent.addEventListner("click", function () {
//   dropdownContent.classList.add("show");
//   dropdownContent.style.backgroundColor = "blue";
//   dropdownContent.style.color = "blue";
//   dropdownContent.style.fontSize = "50";
// });

// let find = document.getElementsByClassName("find");
// let showDiv = document.getElementsByClassName("storeDropdown");

// function show (){
//   find.classList.toggle("visible");
// }

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
});
