class FILTERCMSITEM{
    constructor(){
        this.shiftCmsElm();
    }
    shiftCmsElm(){
        let allCmsLinkelm = [...document.querySelectorAll("[data-item='filter']")];
        let dropDown = document.querySelector("[data-block='dropdown']");
        let dropDownElm = dropDown != undefined && dropDown.querySelector("[data-item='link']")
    
        if(allCmsLinkelm == undefined && dropDown == undefined && dropDownElm == undefined)return;
    
        if(allCmsLinkelm.length > 4){
            let slicedArray = allCmsLinkelm.splice(4, allCmsLinkelm.length);
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
            this.checkLastItem(dropDown);
        }else{
            dropDown.parentElement.remove();
        }
    }
    
    checkLastItem(dropDown){
        let dropdownToCheck = dropDown;
        let lastElm = dropdownToCheck.lastChild;
        lastElm.style.border = 'none';
    
    }
}

window.addEventListener("DOMContentLoaded",new FILTERCMSITEM);