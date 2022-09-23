var resizeTimer;
var tableContent;
function isInViewportCenter(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function activateCategory(id) {
    tableContent = document.querySelectorAll("[data-link='table-item']");
    tableContent.forEach(cat => {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
        if (cat.dataset.id == id) {
            cat.classList.add("active");
        }
    })
}
$(window).on("scroll", function () {
    [...$(".blog-rich-text h2")].forEach((ele) => {
        if (isInViewportCenter(ele)) {
            if (ele.getBoundingClientRect().top >= 0 && ele.getBoundingClientRect().top <= 200) {
                activateCategory(ele.id)
                if (window.screen.width < 786) updateTableOfContent(ele.id);
            }
        }
    });
});

function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}
function getAndSetTableContents(eleBlock, tableEle) {
    const tableChild = $(tableEle).children().eq(0);
    $(tableEle).empty();
    $(eleBlock)
        .find("h2")
        .each(function () {
            const headingTitle = $(this).text();
            if (headingTitle === "Table of contents" || headingTitle === "Inhaltsverzeichnis") return;
            const slugifyedText = convertToSlug(headingTitle);
            $(this).attr("id", slugifyedText);
            $(tableEle).append(
                tableChild.clone(true).text(headingTitle).attr("data-id", slugifyedText)
            );
        });
    $("[data-block='table-block']")
        .children()
        .on("click", function () {
            let id = $(this).data("id");
            scrollFromTop(id);
        });
}
function scrollFromTop(id) {
    let tocElement = document.querySelector(".blog-detail-left").style.position;
    let el = document.getElementById(id);
    if(el == undefined && el == null){
        el=id;
    };
    let elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top;
    let navBar = document.querySelector(".navbar-wrapper");
    let navbarHeight = navBar != undefined && parseInt(window.getComputedStyle(navBar).getPropertyValue("height"));
    let finalHeight  = elDistanceToTop - navbarHeight;
    if(tocElement == 'static'){
        finalHeight = finalHeight - 440
    }
    else{
        finalHeight = finalHeight - 100
    }
    window.scrollTo({
        top: finalHeight,
        behavior: "smooth",
    });
}
function updateTableOfContent(id) {
    let elementNode = document.querySelector(`[data-id='${id}']`);
    if (elementNode != null) {
        let parentElm = elementNode.parentElement;
        parentElm.insertBefore(elementNode, elementNode.parentElement.firstElementChild);
    }
}
window.addEventListener("load", () => {
    getAndSetTableContents($(".blog-rich-text"), $("[data-block='table-block']"));
    if (window.screen.width < 768) setTocSticky();
})


function setTocSticky() {
    let tocElement = document.querySelector(".blog-detail-left");
    let richtextToTrack = document.querySelector(".blog-rich-text").querySelectorAll("h1,h2,h3,h4,h5")[0];
    let tocHead = document.querySelector("[data-item='toc-head']");
    let tocTopElm = document.querySelector(".blog-detail-sticky-flex");
    if(tocHead != undefined){
        tocHead.addEventListener("click", () => {
            if(tocTopElm != undefined)scrollFromTop(tocTopElm)
        })
    }
    window.addEventListener("scroll", () => {
        if (isInViewportCenter(richtextToTrack)) {
            if (richtextToTrack.getBoundingClientRect().top >= 0 && richtextToTrack.getBoundingClientRect().top <= 200) {
                gsap.to(tocElement, {opacity:"0", duration:0});
                gsap.to(tocElement, {position:"sticky", duration:0});
                gsap.to(tocElement, {height:'14em', duration:0});
                gsap.to(tocElement, {opacity:"1", duration:0.5});
            }
            else if (richtextToTrack.getBoundingClientRect().top >= 300 && richtextToTrack.getBoundingClientRect().top <= 400) {
                gsap.to(tocElement, {position:"static", height:'auto', duration:0})
            }
        }
    })
}