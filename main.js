// $(document).ready(function () {
//   $(".show").click(function () {
//     ".show".toggle(".dropdownContent3");
//   });
// });

let dropdownContent = document.getElementsByClassName("dropdownContent3");

dropdownContent.addEventListner("click", function () {
  dropdownContent.classList.add("show");
  dropdownContent.style.backgroundColor = "blue";
  dropdownContent.style.color = "blue";
  dropdownContent.style.fontSize = "50";
});


