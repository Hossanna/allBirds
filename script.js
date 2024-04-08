let cartpage = $("#cart_page")
let fullPage = $("#fullpage")
let body = $("#body")
let productBody = $("#product_body")


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

