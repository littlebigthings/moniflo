function setNavStatic(){
    let navBar = document.querySelector(".navbar-wrapper");
    if(navBar){
        let navBlock = navBar.querySelector(".nav-block");
        navBar.style.position = "static";
        navBar.style.backgroundColor = "transparent";
        navBlock.style.borderBottom = "0px";
    }
}

setNavStatic();