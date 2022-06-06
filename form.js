class LEADFORMSUBMISSION {
    constructor($formElm) {
        this.$formElement = $formElm;
        this.$form = this.$formElement.querySelector("form");
        this.formId = this.$formElement.getAttribute("data-id");
        this.$emailElement = this.$formElement.querySelector(".from-input");
        this.$successBlock = this.$formElement.querySelector(".form-success");
        this.$errorBlock = this.$formElement.querySelector(".failure-block");
        this.$btn = this.$formElement.querySelector("[data-btn='form']");
        this.init();
    }

    init() {
        this.addListener();
    }

    async sendData() {
        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({ email: this.$emailElement.value })
        };
        try {
            const res = await fetch(
                `https://customerioforms.com/forms/submit_action?site_id=9685324a6d458f100895&form_id=${this.formId}&success_url=https://moniflo.webflow.io/`,
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
        this.$formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();
            let resFromSf = this.sendData();
            resFromSf.then(() => {
                this.showHideError(false, true);
            }).catch(() => {
                this.$btn.value = "Try again."
                this.showHideError(true, false);
            })
        })

    }

    showHideError(showError = false, showSuccess= false) {
        showError ? this.$errorBlock.style.display = "block" : this.$errorBlock.style.display = "none";
        if(showSuccess){
            this.$successBlock.style.display = "block";
            this.$form.style.display = "none";
        }
        else{
            this.$successBlock.style.display = "none";
            this.$form.style.display = "block";
        }
    }

}
let formElm = document.querySelector(".common-form-wrapper");
if (formElm != undefined) new LEADFORMSUBMISSION(formElm);