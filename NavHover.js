// One liner function to append the css rule:
// const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

const checkIsCurrent = () => {
    let navBarElm = document.querySelector(".navbar-wrapper");
    let currentActiveElm = navBarElm.querySelector(".w--current");
    let footerElm = document.querySelector(".footer-row");
    let secondActive = footerElm.querySelector(".w--current");
    let isBlogOpen = document.querySelector("[data-page='blog']");
    let bodyBackground = window.getComputedStyle(document.body).getPropertyValue("background-color");
    if (currentActiveElm != undefined && navBarElm != undefined) {
        let getColor = currentActiveElm.getAttribute("data-color");
        let getBackGroundColor = currentActiveElm.getAttribute("nav-color")
        if (getColor != null || getBackGroundColor != null) {
            // addCSS(`.w--current{ background:${getColor}; }`)
            currentActiveElm.style.backgroundColor = getColor;
        }
        if(secondActive != undefined){
            if(getBackGroundColor != null){
                secondActive.style.backgroundColor = getBackGroundColor;
            }
        }
    }
    else if (isBlogOpen != undefined) {
        let activeLink = document.querySelector("[data-active='blog-link']");
        if (activeLink != undefined) {
            let getColor = activeLink.getAttribute("data-color");
            if (getColor != null) {
                activeLink.style.background = getColor;
            }
        }
    }
    if(bodyBackground.length > 0) {
        navBarElm.style.backgroundColor = bodyBackground;
    }
    else{
        navBarElm.style.backgroundColor = '#ededed';
    }
}

checkIsCurrent();