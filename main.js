// $(document).ready(function () {
//   $(".show").click(function () {
//     ".show".toggle(".dropdownContent3");
//   });
// });

let dropdownContent = document.getElementsByClassName("dropdownContent3");

dropdownContent.addEventListner("click", function () {
  dropdownContent.classList.add('show')
});

// addEventListener('click', function (e) {
// //     e.preventDefault();
