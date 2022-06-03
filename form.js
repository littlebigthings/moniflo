class LEADFORMSUBMISSION {
    constructor($formElm) {
        this.$formElement = $formElm;
        this.$emailElement = this.$formElement.querySelector("[data-input='email']");
        this.$successBlock = this.$formElement.querySelector(".form-success");
        this.$errorBlock = this.$formElement.querySelector(".failure-block");
        this.$btn = this.$formElement.querySelector("[data-btn='form']");
        this.init();
    }

    init() {
        this.addListener();
    }

    sendData() {
        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
        };
        try {
            const res = await fetch(
                `https://customerioforms.com/forms/submit_action?site_id=9685324a6d458f100895&form_id=62653a7d8ecf47&success_url=https://moniflo.webflow.io/`
            );

            if (res) {
                return res;
            }
            else {
                this.showMsg(true);
            }
        }
        catch {
            this.showMsg(true);
        }
    }

    addListener() {
        this.showHideError();
        this.$formElement.addEventListener("submit", (event) => {
            // console.log(_cio.identify({
            //     // Required attributes
            //     id: `${this.$emailElement.value}`,
            // }));
            if (this.sendData()) {
                this.showHideError(false);
            }
            else if (!this.sendData()) {
                event.preventDefault();
                event.stopPropagation();
                this.$btn.value = "Try again."
                this.showHideError(true);
            }
        })

    }

    showHideError(showError = false) {
        showError ? this.$errorBlock.style.display = "block" : this.$errorBlock.style.display = "none";
    }

}
let formElm = document.querySelector("[data-form='leadform']");
// if (formElm != undefined) new LEADFORMSUBMISSION(formElm);