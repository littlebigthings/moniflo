// One liner function to append the css rule:
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

const checkIsCurrent = () => {
    let currentActiveElm = document.querySelector(".w--current");
    let isBlogOpen = document.querySelector("[data-page='blog']");
    if (currentActiveElm != undefined) {
        let getColor = currentActiveElm.getAttribute("data-color");
        if (getColor != null) {
            addCSS(`.w--current{ background:${getColor}; }`)
        }
    }
    else if (isBlogOpen != undefined) {
        let activeLink = document.querySelector("[data-active='blog-link']");
        if (activeLink != undefined) {
            let getColor = activeLink.getAttribute("data-color");
            if(getColor != null){
                activeLink.style.background=getColor;
            }
        }
    }
}

checkIsCurrent();