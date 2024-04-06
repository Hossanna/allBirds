function showMenu(){
    let womenMenu = $("#dropdown-menu")
    let fullPage = $("#fullpage")
    womenMenu.fadeToggle(200)
    fullPage.toggleClass("dark-background");
}

function showProduct(){
    window.location.href = "./product.html"
}