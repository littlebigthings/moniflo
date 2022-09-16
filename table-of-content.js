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
            if (ele.getBoundingClientRect().top >= 0 && ele.getBoundingClientRect().top <= 400) {
                activateCategory(ele.id)
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
            if(headingTitle === "Table of contents" || headingTitle === "Inhaltsverzeichnis") return;
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
    let el = document.getElementById(id);
    let elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top;
    let navBar = document.querySelector(".navbar-wrapper");
    let navbarHeight = navBar != undefined && parseInt(window.getComputedStyle(navBar).getPropertyValue("height"));
    window.scrollTo({
        top: elDistanceToTop - navbarHeight,
        behavior: "smooth",
    });
}
window.addEventListener("load",()=>{
    getAndSetTableContents($(".blog-rich-text"), $("[data-block='table-block']"));
})