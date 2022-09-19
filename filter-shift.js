function shiftCmsElm(){
    let allCmsLinkelm = [...document.querySelectorAll("[data-item='filter']")];
    let dropDown = document.querySelector("[data-block='dropdown']");
    let dropDownElm = dropDown != undefined && dropDown.querySelector("[data-item='link']")

    if(allCmsLinkelm == undefined && dropDown == undefined && dropDownElm == undefined)return;

    if(allCmsLinkelm.length > 7){
        let slicedArray = allCmsLinkelm.splice(7, allCmsLinkelm.length);
        slicedArray.forEach(item => {
            let itemInnerText = item.innerText;
            let itemLink = item.getAttribute("href");
            let clonedDropDownItem = dropDownElm.cloneNode(true);
            clonedDropDownItem.setAttribute("href", itemLink);
            clonedDropDownItem.innerText = itemInnerText;
            dropDown.appendChild(clonedDropDownItem)
            item.parentElement.remove();
        })
        dropDownElm.remove();
        checkLastItem(dropDown);
    }
}

function checkLastItem(dropDown){
    let dropdownToCheck = dropDown;
    let lastElm = dropdownToCheck.lastChild;
    lastElm.style.border = 'none';

}
if(window.screen.width >= 768){
    shiftCmsElm();
}