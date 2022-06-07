class LEADFORMSUBMISSION {
    constructor() {
        this.$formElement = document.querySelectorAll("[data-form='leadform']");
        this.$formArr = document.querySelectorAll("form");
        this.$successBlockArr = document.querySelectorAll(".form-success");
        this.$errorBlockAr = document.querySelectorAll(".failure-block");
        this.$btnArr = document.querySelectorAll("[data-btn='form']");
        this.init();
    }

    init() {
        this.addListener();
    }

    async sendData(id, email) {
        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({ email: email })
        };
        try {
            const res = await fetch(
                `https://customerioforms.com/forms/submit_action?site_id=9685324a6d458f100895&form_id=${id}&success_url=https://moniflo.webflow.io/`,
                requestOptions
            );
            if (res) {
                return res;
            }
            else {
                this.showHideError(true, false);
            }
        }
        catch {
            this.showHideError(true,false);
        }
    }

    addListener() {
        this.showHideError();
        this.$formElement.forEach(formItem => {
            formItem.addEventListener("submit", (event) => {
                event.preventDefault();
                event.stopPropagation();
                let formId = event.currentTarget.getAttribute("form-id");
                let email = event.target.querySelector("input[type='email']").value;
                this.$btnArr.forEach(btn => btn.value = "Please wait...")
                let resFromSf = this.sendData(formId, email);
                resFromSf.then((res) => {
                    if(res == undefined)return;
                    this.showHideError(false, true);
                }).catch((err) => {
                    this.showHideError(true, false);
                })
            })
        })
    }

    showHideError(showError = false, showSuccess= false) {
        if(showSuccess && !showError){
            this.$successBlockArr.forEach(block => {block.style.display = "block"})
            this.$formArr.forEach(block => {block.style.display = "none"})
            this.$errorBlockAr.forEach(block => {block.style.display = "none"})
        }
        else if(!showSuccess && showError){
            this.$successBlockArr.forEach(block => {block.style.display = "none"})
            this.$errorBlockAr.forEach(block => {block.style.display = "block"})
            this.$btnArr.forEach(btn => btn.value = "Try again.")
        }
    }

}
new LEADFORMSUBMISSION;