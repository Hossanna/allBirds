let cartpage = $("#cart_page")
let fullPage = $("#fullpage")


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
    
}

function closeCartPage(){
    cartpage.fadeOut(300)
    fullPage.removeClass("dark-background");

}

