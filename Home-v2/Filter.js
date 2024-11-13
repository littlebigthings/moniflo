class HANDLEFILTERS {
    constructor() {
        this.$mainWrapper = document.querySelector("[component-type='cms-filter']");
        this.$FilterDropdownArray = this.$mainWrapper?.querySelectorAll(".filter-button");
        this.$filterClear = this.$mainWrapper?.querySelector("[fs-cmsfilter-element='clear']");
        this.$filteredCMS = this.$mainWrapper?.querySelector("[cms-filter='filter-state']");
        this.$restCMS = this.$mainWrapper?.querySelector("[cms-filter='rest-state']");
        this.$itemToInject=this.$mainWrapper?.querySelector("[item-to='inject']");
        this.$injectOnceWrapper = this.$mainWrapper?.querySelector("[cms-filter='inject']");
        this.$injectDynamicWrapper = this.$mainWrapper?.querySelector("[cms-filter='inject-dynamic']");

        this.$priceText = this.$mainWrapper?.querySelectorAll(".card-text.para-16-b");
        this.$progressBarArray=this.$mainWrapper?.querySelectorAll("[progress-bar='parent']");
        this.init();
    }

    init() {
        this.handleDropdown();
        this.handleInjection();
        this.handlePricing();
        this.handleProgressBar();
    }

    handleProgressBar(){
        if (this.$progressBarArray?.length>0) {
            this.$progressBarArray.forEach(bar=>{
                const barToProgress = bar?.querySelector("[progress-bar='move']");
                const widthTillProgress = bar?.querySelector("[progress-bar='value']")
                barToProgress.style.width=widthTillProgress.textContent;
                widthTillProgress.style.left=parseFloat(widthTillProgress.textContent)+8+"%";
            })
        }
    }
    handlePricing(){
        if (this.$priceText.length>0) {
            this.$priceText.forEach(textElement =>{
                const textContent = textElement.textContent;
                if(textContent.charAt(0)=="-"){
                    textElement.style.color="#B74E4E";
                }
            })
        }
    }

    handleDropdown() {
        if (this.$FilterDropdownArray?.length > 0) {
            this.$FilterDropdownArray.forEach(dropdown => {
                const $ddHead = dropdown.querySelector("[cms-filter='active-class']");
                const $ddText = dropdown.querySelector("[cms-filter='active-text']");
                const defaultText = $ddText.textContent;
                $ddText.setAttribute("default", defaultText);
                const $ddItemArray = dropdown.querySelectorAll("[cms-filter='filter-item']");
                if ($ddItemArray.length > 0) {
                    $ddItemArray.forEach(filterItem => {
                        const $checkbox = filterItem.querySelector("input");
                        const filterText = filterItem.textContent;
                        $checkbox.addEventListener("change", (evt) => {
                            const checkIfActive = evt.currentTarget.checked;
                            if (checkIfActive) {
                                $ddHead.classList.add("active");
                                $ddText.textContent = filterText;
                            }
                            else {
                                const defaultText = $ddText.getAttribute("default");
                                $ddHead.classList.remove("active");
                                $ddText.textContent = defaultText;
                            }
                            this.checkFiltersAndShowRest(checkIfActive);
                        })
                    })
                }
            })
        }
    }
    checkFiltersAndShowRest(show) {
        if (show) {
            this.$filteredCMS.style.display = "block";
            this.$restCMS.style.display = "none";
        } else {
            this.$filteredCMS.style.display = "none";
            this.$restCMS.style.display = "block";
        }
    }
    handleInjection(){
        if (this.$injectOnceWrapper!=null&&this.$injectDynamicWrapper!=null) {
            this.$injectOnceWrapper.appendChild(this.$itemToInject);
            const clonedCard = this.$itemToInject.cloneNode(true);
            clonedCard.addEventListener("click",()=>{
                this.$itemToInject.querySelector(".popup-trigger").click();
            })
            this.$injectDynamicWrapper.appendChild(clonedCard);
        }
    }
}

new HANDLEFILTERS();