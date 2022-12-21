class FAQCATEGORIES {
    constructor() {
        this.cmsFilterFrom = document.querySelector("[data-wrapper='to-filter']");
        this.allFaqQuestions = this.cmsFilterFrom && this.cmsFilterFrom.querySelectorAll("[data-item='faq-que']");
        this.wrapperToClone = document.querySelector("[data-item='wrapper']");
        this.filterCategory = document.querySelectorAll("[data-item='filter']");
        this.gridToAddWrapper = document.querySelector(".faqs-grid-wrapper");
        this.filteredData = {};
        this.init();
    }

    init() {
        if(window.screen.width >= 768){
            this.shiftCmsElm();
        }
        this.categoriesFaq();
    }

    categoriesFaq() {
        if (this.filterCategory && this.allFaqQuestions && this.filterCategory.length > 0 && this.allFaqQuestions.length > 0) {
            this.filterCategory.forEach(item => {
                let filterValue = item.textContent;
                this.filteredData[`${filterValue}`] = [];
                this.allFaqQuestions.forEach(question => {
                    question.setAttribute("params", this.convertToSlug(question.textContent));
                    let questionCategory = question.nextElementSibling.textContent;
                    if(questionCategory === filterValue){
                        this.filteredData[`${filterValue}`].push({
                            'question':question,
                            "url":item.getAttribute("href"),
                        });
                    }
                })

            })
            this.updateFaqDom();
        }
    }

    updateFaqDom(){
        if(this.wrapperToClone && this.filteredData){
            for (const [category, faqs] of Object.entries(this.filteredData)) {
               let newFaqWithCategory = this.wrapperToClone.cloneNode(true);
               let filterHead = newFaqWithCategory.querySelector("[data-item='faq-category']");
               let faqToInsertWrap = newFaqWithCategory.querySelector(".faq-questions-wrapper");
               let faqItem = newFaqWithCategory.querySelector("[data-item='faq-item']");
               filterHead.textContent = category;
               if(faqs.length>0){
                   filterHead.setAttribute("href",faqs[0]["url"])
                faqs.forEach(faq => {
                    let clonedFaq = faqItem.cloneNode(true);
                    clonedFaq.textContent = faq["question"].textContent;
                    clonedFaq.setAttribute("href", `${faq["url"]+'/?'+'open='+this.convertToSlug(faq["question"].textContent)}`)
                    faqToInsertWrap.appendChild(clonedFaq);
                })
               }
               faqItem.remove()
               this.gridToAddWrapper.appendChild(newFaqWithCategory)
            }
            this.wrapperToClone.remove();
            this.cmsFilterFrom.remove();
        }
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
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

window.addEventListener("DOMContentLoaded",new FAQCATEGORIES);