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
       
        this.updateUserAPI = "https://hook.eu1.make.com/849pes9kccdrqgxsa60qn1zbvzdr1hh1"; //final one.
        this.checkUserAPI = "https://hook.eu1.make.com/e04ixvtb7oxshiu9b7bj15bsxp5ommlw";

        this.referralCode = null;
        this.refSource = null;
        this.userInfo = null;
        this.referrerInfo = null;
        this.userDataTosend = null;
        this.userLocalData = null;
        this.init();
    }

    init() {
        this.activateCampaign();
    }

    async activateCampaign() {
        this.campaign = await ViralLoops.getCampaign(this.CAMPAIGNID);
        if (this.campaign.isUserLoggedIn == undefined) {
            this.checkSearchURL();
            this.handleSubmission();
        } else if (this.campaign.isUserLoggedIn != undefined) {
            this.userInfo = await this.campaign.getUser(this.campaign.isUserLoggedIn);
            if (this.userInfo.referralCode != undefined) {
                this.verificationOrRedirection({
                    showContainer: true,
                    showForm: false,
                    showVerification: false,
                    showRedirection: true,
                    showLottie: false,
                })
            }
        }
    }

    checkSearchURL() {
        const url = new URL(document.location);
        const searchParams = new URLSearchParams(url.search);
        const paramsObject = {};

        for (const [key, value] of searchParams.entries()) {
            paramsObject[key] = decodeURIComponent(value);
        }
        console.log(paramsObject)
        if (Object.keys(paramsObject).length === 0) {
            this.checkUserExistsViaApi();
        } else {
            if (paramsObject.verified && paramsObject.email) {
                this.registerAndverifyUser({
                    firstname: paramsObject.firstname,
                    email: paramsObject.email,

                });

            } else if (paramsObject.referralCode || paramsObject.refSource) {
                this.referralCode = paramsObject.referralCode;
                this.refSource = paramsObject.refSource;
                console.log(this.refSource, this.referralCode, "ref data from viral loop")
                this.checkUserExistsViaApi();
            }
            // added patch fix
            else{
                this.verificationOrRedirection({
                    showContainer: true,
                    showForm: true,
                    showVerification: false,
                    showRedirection: false,
                    showLottie: false,
                })
            }
        }
    }

    async checkUserExistsViaApi() {
        this.userLocalData = this.getLocalStorage("userAPIData") != null && JSON.parse(this.getLocalStorage("userAPIData"));
        if (this.userLocalData != null) {
            // if user exists
            if (this.userLocalData.attributes) {
                // Check if user is verified/not verified
                if (this.userLocalData.attributes.email != undefined) {
                    let userObj = JSON.stringify({ email: this.userLocalData.attributes.email });
                    let checkOnceViaApi = await this.callApi(this.checkUserAPI, userObj);
                    this.handleAPIcall(checkOnceViaApi)

                }
            }
        }
        // if user not exists show form
        if (this.userLocalData == false) {
            this.verificationOrRedirection({
                showContainer: true,
                showForm: true,
                showVerification: false,
                showRedirection: false,
                showLottie: false,
            })
        }
    }

    async registerAndverifyUser(userData) {

        userData = {
            ...userData, "consents": {
                "consent": "true",
                // "2":"true"
            },
        }
        // Identify user in campaign
        // console.log('[Viral Loops] Identifying...', this.userDataTosend);
        const response = await this.campaign.identify(userData).catch(error => {
            console.error("[Viral Loops] Participation error", error);
        });

        // Log response
        console.log(response, "user registered on viral loop")
        if (response) {
            this.userInfo = await this.campaign.getUser();
            // need to sort this out
            this.referrerInfo = await this.campaign.getReferrer();
            console.log(this.referrerInfo)
            this.userDataTosend = JSON.stringify({
                firstname: userData.firstname,
                email: userData.email,
                consent: userData.consent,
                language: userData.language,
                referralCode: userData.referralCode,
                refSource: userData.refSource,
                verified: true,
            })
            console.log(this.userDataTosend)
            let updateUser = await this.callApi(this.updateUserAPI, this.userDataTosend);
            console.log(updateUser, "update verified user")
            this.handleAPIcall(updateUser)
        }

    }

    async checkUserExists() {
        this.userLocalData = this.getLocalStorage("userAPIData") != null && JSON.parse(this.getLocalStorage("userAPIData"));
        // Check with localStorage if user data exists.
        if (this.userLocalData != null) {
            // if user exists
            if (this.userLocalData.attributes) {
                // Check if user is verified/not verified
                if (this.userLocalData.attributes.verified == "true") {
                    // if verified show redirection
                    this.verificationOrRedirection({
                        showContainer: true,
                        showForm: false,
                        showVerification: false,
                        showRedirection: true,
                        showLottie: false,
                    })

                } else {
                    // Not verified show verify email
                    console.log(this.userLocalData, "localStorage data")
                    for (let i = 0; i < this.userEmailVerfiyMessage.length; i++) {
                        this.userEmailVerfiyMessage[i].textContent = this.userLocalData.attributes.email;
                    }
                    this.verificationOrRedirection({
                        showContainer: true,
                        showForm: false,
                        showVerification: true,
                        showRedirection: false,
                        showLottie: false,
                    })
                }
            }
        }
        // if user not exists show form
        if (this.userLocalData == false) {
            this.verificationOrRedirection({
                showContainer: true,
                showForm: true,
                showVerification: false,
                showRedirection: false,
                showLottie: false,
            })
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

                if (showHideObj.showLottie) {
                    lottie.style.display = "block";
                } else {
                    setTimeout(() => lottie.style.display = "none", 500)
                }

                if (showHideObj.showContainer) {
                    setTimeout(() => formContainer.style.visibility = "visible", 600)
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

    // function to handle form submission
    handleSubmission() {
        if (this.formArray.length > 0) {
            for (let i = 0; i < this.formArray.length; i++) {
                let form = this.formArray[i];
                if (form == undefined) return;
                let firstName = form.querySelector("[data-item='first-name']");
                let email = form.querySelector("[data-item='email']");
                let language = form.querySelector("[data-name='language']");
                let consent = form.querySelector("[data-item='checkbox']");

                // GTM params values
                let data_key = form.getAttribute("[data-tracking-status]");
                let data_value = form.getAttribute("[data-tracking-key]");;
                let event_action = form.getAttribute("[data-tracking-value]");;
                let page_url = window.location.href;

                if (firstName == undefined && email == undefined && language == undefined && consent == undefined) return;
                form.addEventListener("submit", async (evt) => {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                    // console.log(this.extraData)
                    let userObj = {
                        firstname: firstName.value,
                        email: email.value,
                        consent: consent.checked,
                        language: language.value,
                        referralCode: this.referralCode,
                        refSource: this.refSource,
                    }

                    let encodedURL = this.getEncodedURL(userObj);
                    userObj.verifyByUrl = encodedURL;
                    userObj.verified = false;
                    this.userDataTosend = JSON.stringify(userObj);
                    // console.log(this.userDataTosend)
                    this.verificationOrRedirection({
                        showContainer: false,
                        showForm: false,
                        showVerification: false,
                        showRedirection: false,
                        showLottie: true,
                    })

                     // Call GTM for form submission
                     window.dataLayer = window.dataLayer || [];
                     window.dataLayer.push({
                         'event': 'FormSubmit',
                         "gtm.element": form
                     });
                    let verifyUser = await this.callApi(this.checkUserAPI, this.userDataTosend);
                    this.handleAPIcall(verifyUser)
                })
            }
        }
    }

    async handleAPIcall(data) {
        // console.log(data)
        if (data.attributes) {
            if (data.attributes.verified != undefined) {
                console.log(data, "already exists")
                this.updateLocalStorage("userAPIData", JSON.stringify(data));
                this.checkUserExists()
            }
            else {
                console.log(data, "add new user no verified found")
                let responce = await this.callApi(this.updateUserAPI, this.userDataTosend);
                this.handleAPIcall(responce)
            }
        } else if (!data.attributes && data.data == "user not exists") {
            console.log(data, "add new user")
            let responce = await this.callApi(this.updateUserAPI, this.userDataTosend);
            this.handleAPIcall(responce)
        }
        else if (!data.attributes && data.data == "updated") {
            setTimeout(async () => {
                console.log(data, "new user get data")
                let responce = await this.callApi(this.checkUserAPI, this.userDataTosend);
                this.handleAPIcall(responce)
            }, 3000)
        }
        else {
            console.log(data, "add new user no attributes present")
            let responce = await this.callApi(this.updateUserAPI, this.userDataTosend);
            this.handleAPIcall(responce)
        }
    }

    updateLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    async callApi(url, data) {
        // console.log(data)
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }
        try {
            let jsonData = await fetch(url, options).then(res => res.json());
            return jsonData
        } catch (error) {
            console.log(error)
        }
    }

    getEncodedURL(userData) {
        const baseUrl = new URL(document.location).origin;
        const path = new URL(document.location).pathname;
        const searchParams = new URLSearchParams(userData);

        const url = baseUrl + path + '?' + searchParams;
        return encodeURI(url)
    }
}

new CUSTOMVIRALLOOP;