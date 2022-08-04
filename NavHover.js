// One liner function to append the css rule:
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

const checkIsCurrent = () => {
    let currentActiveElm = document.querySelector(".w--current");
    let secondActive = document.querySelectorAll(".w--current")[1];
    let isBlogOpen = document.querySelector("[data-page='blog']");
    let navBarElm = document.querySelector(".navbar-wrapper");
    if (currentActiveElm != undefined && navBarElm != undefined) {
        let getColor = currentActiveElm.getAttribute("data-color");
        let getBackGroundColor = currentActiveElm.getAttribute("nav-color")
        if (getColor != null || getBackGroundColor) {
            addCSS(`.w--current{ background:${getColor}; }`)
            navBarElm.style.backgroundColor = getBackGroundColor;
        }
        if(secondActive != undefined){
            secondActive.style.backgroundColor = getBackGroundColor;
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
    else {
        if (document.location.pathname == "/thank-you") {
            navBarElm.style.backgroundColor = "#F1E68A";
        }     
        else if (document.location.pathname == "/legal/privacy-policy") {
            navBarElm.style.backgroundColor = "#ededed";
        }
        else if (document.location.pathname == "/legal/terms-and-conditions") {
            navBarElm.style.backgroundColor = "#ededed";
        }
    }
}

checkIsCurrent();