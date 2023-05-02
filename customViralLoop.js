class CUSTOMVIRALLOOP {
    constructor() {
        this.CAMPAIGNID = "vc1bqKEDGe5MKFu27VO3lH3Y8f8" //replace with the correct one.
        this.campaign;
        this.spinner = document.querySelectorAll("[data-item='lottie']");
        this.formContainer = document.querySelectorAll("[hide-onload='true']");
        this.formArray = document.querySelectorAll("[data-wrapper='form']");
        this.successWrapperArray = document.querySelectorAll("[data-wrapper='success']");
        this.verifyEmailWrapperArray = document.querySelectorAll("[data-wrapper='verify-email']");
        this.redirectionWrapperArray = document.querySelectorAll("[data-wrapper='redirection']");
        this.userEmailVerfiyMessage = document.querySelectorAll("[data-add='user-email']");
        this.form;
        this.firstName;
        this.email;
        this.language;
        this.concent;
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
        const isUserVerfied = localStorage.getItem("isUserVerified");
        const params = new URL(document.location).searchParams;
        const payload = JSON.parse(decodeURIComponent(params.get("payload")));
        if (payload != null) {
            const firstName = payload.user.firstname;
            const email = payload.user.email;
            // console.log(firstName, email);
            if (firstName != undefined && email != undefined) {
                let verificationData = JSON.stringify({"isVerified":"yes", email:email})
                localStorage.setItem("isUserVerified", verificationData)
                this.verificationOrRedirection({
                    showContainer: true,
                    showForm: false,
                    showVerification: false,
                    showRedirection: true,
                })
            }
        }
        else if (this.campaign.isUserLoggedIn != undefined) {
            this.userInfo = await this.campaign.getUser(this.campaign.isUserLoggedIn);
            // console.log(this.userInfo)
            if (this.userInfo.referralCode != undefined) {
                let verificationData = JSON.stringify({"isVerified":"yes"})
                localStorage.setItem("isUserVerified", verificationData)
                this.verificationOrRedirection({
                    showContainer: true,
                    showForm: false,
                    showVerification: false,
                    showRedirection: true,
                })
            }
        } else if (isUserVerfied != null) {
            let userData = JSON.parse(isUserVerfied)
            // console.log(userData)
            if (userData.isVerified === "no") {
                this.verificationOrRedirection({
                    showContainer: true,
                    showForm: false,
                    showVerification: true,
                    showRedirection: false,
                })
                for (let i = 0; i < this.userEmailVerfiyMessage.length; i++) {
                    this.userEmailVerfiyMessage[i].textContent = userData.email;
                }
            }
        }
        else {
            this.verificationOrRedirection({
                showContainer: true,
                showForm: true,
                showVerification: false,
                showRedirection: false,
            })
            // this.verificationOrRedirection(false, true, true)
        }
    }

    // function to show/hide email and redirection wrapper
    verificationOrRedirection(showHideObj) {
        if (this.formContainer.length > 0) {
            for (let i = 0; i < this.formContainer.length; i++) {
                let formContainer = this.formContainer[i];
                let lottie = this.spinner[i];
                let form = this.formArray[i];
                let success = this.successWrapperArray[i];
                let verification = this.verifyEmailWrapperArray[i];
                let redirection = this.redirectionWrapperArray[i];


                if (showHideObj.showContainer) {
                    lottie.style.display = "block";
                    formContainer.style.visibility = "hidden";
                    setTimeout(() => {
                        lottie.style.display = "none";
                        formContainer.style.visibility = "visible";
                    }, 500);
                }

                if (showHideObj.showForm) {
                    form.classList.remove("hide-form");
                }
                else {
                    form.classList.add("hide-form");
                }

                if (showHideObj.showVerification) {
                    redirection.classList.add("hide");
                    verification.classList.remove("hide");
                    success.style.display = "block";
                }

                if (showHideObj.showRedirection) {
                    verification.classList.add("hide");
                    redirection.classList.remove("hide");
                    success.style.display = "block";
                }


            }
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
        console.log(this.userInfo)
        if (this.userInfo.dt != undefined) {
            for (let i = 0; i < this.userEmailVerfiyMessage.length; i++) {
                this.userEmailVerfiyMessage[i].textContent = this.userInfo.email;
            }

            // set user info for verification
            let verificationData = JSON.stringify({ "isVerified": "no", "email": this.userInfo.email })
            localStorage.setItem("isUserVerified", verificationData)

            this.verificationOrRedirection({
                showContainer: true,
                showForm: false,
                showVerification: true,
                showRedirection: false,
            })
        } else if (this.userInfo.referralCode != undefined) {
            this.verificationOrRedirection({
                showContainer: true,
                showForm: false,
                showVerification: false,
                showRedirection: true,
            })
        }
    }

    // function to handle form submission
    handleSubmission() {
        if (this.formArray.length > 0) {
            for (let i = 0; i < this.formArray.length; i++) {
                let form = this.formArray[i];
                if (form == undefined) return;
                let firstName = form.querySelector("[data-item='first-name']");
                let email = form.querySelector("[data-item='email']");
                let language = form.querySelector("[data-name='language']");
                let concent = form.querySelector("[data-item='checkbox']");
                if (firstName == undefined && email == undefined && language == undefined && concent == undefined) return;
                form.addEventListener("submit", () => {
                    let extraData = {
                        concent: concent.checked,
                        language: language.value,
                    }
                    // console.log(this.extraData)
                    this.userDataTosend = {
                        firstname: firstName.value,
                        email: email.value,
                        extraData: extraData
                    };
                    this.handleVerification();
                })
            }
        }
    }
}

new CUSTOMVIRALLOOP;