let cartpage = $("#cart_page")
let fullPage = $("#fullpage")


function showMenu(){
    let womenMenu = $("#dropdown-menu")
    let fullPage = $("#fullpage")
    womenMenu.fadeToggle(200)
    fullPage.toggleClass("dark-background");
}


function showCartPage() {
    cartpage.fadeIn(300)
    fullPage.addClass("dark-background");
    
}

function closeCartPage(){
    cartpage.fadeOut(300)
    fullPage.removeClass("dark-background");

}

