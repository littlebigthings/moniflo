// One liner function to append the css rule:
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

const checkIsCurrent = () => {
    let currentActiveElm = document.querySelector(".w--current");
    let secondActive = document.querySelectorAll(".w--current")[1];
    let isBlogOpen = document.querySelector("[data-page='blog']");
    let navBarElm = document.querySelector(".navbar-wrapper");
    let bodyBackground = window.getComputedStyle(document.body).getPropertyValue("background-color");
    if (currentActiveElm != undefined && navBarElm != undefined) {
        let getColor = currentActiveElm.getAttribute("data-color");
        let getBackGroundColor = currentActiveElm.getAttribute("nav-color")
        if (getColor != null || getBackGroundColor != null) {
            addCSS(`.w--current{ background:${getColor}; }`)
            navBarElm.style.backgroundColor = getBackGroundColor;
        }
        if(secondActive != undefined){
            if(getBackGroundColor != null){
                secondActive.style.backgroundColor = getBackGroundColor;
                navBarElm.style.backgroundColor = getBackGroundColor;
            }else{
                navBarElm.style.backgroundColor = bodyBackground;
            }
        }
        else{
            navBarElm.style.backgroundColor = bodyBackground;
        }
    }
    else if (isBlogOpen != undefined) {
        let activeLink = document.querySelector("[data-active='blog-link']");
        if (activeLink != undefined) {
            let getColor = activeLink.getAttribute("data-color");
            let getBackGroundColor = activeLink.getAttribute("nav-color")
            if (getColor != null) {
                activeLink.style.background = getColor;
                navBarElm.style.backgroundColor = getBackGroundColor;
            }
        }
    }
    else if(bodyBackground.length > 0) {
        navBarElm.style.backgroundColor = bodyBackground;
    }
    else{
        navBarElm.style.backgroundColor = '#ededed';
    }
}

checkIsCurrent();