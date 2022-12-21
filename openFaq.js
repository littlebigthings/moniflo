class OPENFAQ {
    constructor() {
        this.allFaqElmsArr = document.querySelectorAll("[data-wrapper='faq']");
        this.updateUrlObj = {
            open: "null",
        }
        this.init();
    }

    init() {
        if (window.screen.width >= 768) {
            this.shiftCmsElm();
        }
        this.setSlugValues();
        this.checkAndOpenFaq();
        this.initOpener();
    }

    setSlugValues() {
        if (this.allFaqElmsArr.length > 0) {
            this.allFaqElmsArr.forEach(faq => {
                let question = faq.querySelector("[data-item='question']");
                if (question) {
                    question.setAttribute("data-name", this.convertToSlug(question.textContent))
                }
            })
        }
    }

    checkAndOpenFaq() {
        let params = new URLSearchParams(document.location.search);
        let faqToOpen = params.get("open");
        if (this.allFaqElmsArr.length > 0 && faqToOpen != null) {
            this.allFaqElmsArr.forEach(faq => {
                let question = faq.querySelector("[data-item='question']");
                if (question) {
                    let faqQuestion = question.getAttribute("data-name");
                    if(faqQuestion === faqToOpen){
                        faq.click();
                    }
                }
            })
        }
    }

    initOpener() {
        if (this.allFaqElmsArr.length > 0) {
            this.allFaqElmsArr.forEach(faq => {
                faq.addEventListener("click", (evt) => {
                    let question = evt.currentTarget.querySelector("[data-item='question']");
                    if (question) {
                        this.updateUrlObj.open = question.getAttribute("data-name");
                        this.updateUrl();
                    }
                })
            })
        }
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }


    updateUrl() {
        if (!this.updateUrlObj) return;
        const url = new URL(window.location.href);
        Object.keys(this.updateUrlObj).forEach((key) => {
            url.searchParams.delete("open")
            url.searchParams.append(key, this.updateUrlObj[key])
        });
        window.history.pushState({}, "", url);
    }

    shiftCmsElm() {
        let allCmsLinkelm = [...document.querySelectorAll("[data-item='filter']")];
        let dropDown = document.querySelector("[data-block='dropdown']");
        let dropDownElm = dropDown != undefined && dropDown.querySelector("[data-item='link']")

        if (allCmsLinkelm == undefined && dropDown == undefined && dropDownElm == undefined) return;

        if (allCmsLinkelm.length > 4) {
            allCmsLinkelm.forEach(item => {
                if(item.classList.contains("w--current") && allCmsLinkelm.indexOf(item) >= 3){
                    allCmsLinkelm[2].parentElement.insertAdjacentElement("afterend", item.parentElement)
                }
            })
            let updatedCategoryDom = [...document.querySelectorAll("[data-item='filter']")];
            let slicedArray = updatedCategoryDom.splice(4, allCmsLinkelm.length);
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
        } else {
            dropDown.parentElement.remove();
        }
    }

    checkLastItem(dropDown) {
        let dropdownToCheck = dropDown;
        let lastElm = dropdownToCheck.lastChild;
        lastElm.style.border = 'none';

    }
}

window.addEventListener("DOMContentLoaded", new OPENFAQ)