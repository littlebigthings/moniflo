class CUSTOMVIRALLOOP {
    constructor(formObj) {
        this.CAMPAIGNID = "IK8UXscavREr5gLFiLx15OKpiew" //replace with the correct one.
        this.campaign;
        this.form = formObj.formItem;
        this.firstName = formObj.firstName;
        this.email = formObj.email;
        this.language = formObj.language;
        this.concent = formObj.concentBox;
        this.successWrapper = formObj.successWrapper;
        this.verifyEmailWrapper = formObj.verificationWrapper;
        this.redirectionWrapper = formObj.redirectionWrapper;
        this.userInfo = null;
        this.userDataTosend = null;
        this.init();
    }

    init() {
        this.startCampaign();
        this.handleSubmission();
    }

    // function to start campaign
    async startCampaign() {
        // Get campaign by ID
        this.campaign = await ViralLoops.getCampaign(this.CAMPAIGNID);
        // console.log(this.campaign)
        this.checkVerification();
    }

    // function to check if user email is verified or not
    async checkVerification() {
        const params = new URL(document.location).searchParams;
        const payload = JSON.parse(decodeURIComponent(params.get("payload")));
        if (payload != null) {
            const firstName = payload.user.firstname;
            const email = payload.user.email;
            // console.log(firstName, email);
            if (firstName != undefined && email != undefined) {
                this.verificationOrRedirection(false)
            }
        }
        else if (this.campaign.isUserLoggedIn != undefined) {
            this.userInfo = await this.campaign.getUser(this.campaign.isUserLoggedIn);
            // console.log(this.userInfo)
            if(this.userInfo.referralCode != undefined){
                this.verificationOrRedirection(false)
            }
        }
    }

    // function to show/hide email and redirection wrapper
    verificationOrRedirection(showVerification) {
        this.form.classList.add("hide-form")
        this.successWrapper.style.display = "block";
        if (showVerification) {
            this.redirectionWrapper.classList.add("hide");
            this.verifyEmailWrapper.classList.remove("hide");
        }
        else {
            this.verifyEmailWrapper.classList.add("hide");
            this.redirectionWrapper.classList.remove("hide");
        }
    }

    // function to handle verification
    async handleVerification() {
        // Identify user in campaign
        // console.log('[Viral Loops] Identifying...', this.userDataTosend);
        const response = await this.campaign.identify(this.userDataTosend).catch(error => {
            console.error("[Viral Loops] Participation error", error);
        });

        // Log response
        // console.log(response)
        this.userInfo = await this.campaign.getUser();
        if (this.userInfo.dt != undefined) {
            this.verificationOrRedirection(true);
        }else if(this.userInfo.referralCode != undefined){
            this.verificationOrRedirection(false);
        }
    }

    // function to handle form submission
    handleSubmission() {
        this.form.addEventListener("submit", () => {
            this.userDataTosend = {
                firstname: this.firstName.value,
                email: this.email.value,
                concent: this.concent.checked,
                language: this.language.value,
            };
            this.handleVerification();
        })
    }
}

function handleForm() {
    let formWrapper = document.querySelectorAll("[data-wrapper='form']");
    if (formWrapper.length > 0) {
        for (let index = 0; index < formWrapper.length; index++) {
            let formBlock = formWrapper[index];
            if (formBlock == undefined) return;
            let successWrapper = formBlock.parentElement.querySelector("[data-wrapper='success']");
            let formObj = {
                formItem: formBlock,
                firstName: formBlock.querySelector("[data-item='first-name']"),
                email: formBlock.querySelector("[data-item='email']"),
                language: formBlock.querySelector("[data-name='language']"),
                concentBox: formBlock.querySelector("[data-item='checkbox']"),
                successWrapper:successWrapper,
                verificationWrapper: successWrapper.querySelector("[data-wrapper='verify-email']"),
                redirectionWrapper: successWrapper.querySelector("[data-wrapper='redirection']"),
            }
            new CUSTOMVIRALLOOP(formObj);
        }
    }
}

handleForm();