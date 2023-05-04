class LEADERBOARD {
    constructor() {
        this.CAMPAIGNID = "vc1bqKEDGe5MKFu27VO3lH3Y8f8" //replace with the correct one.

        this.userRankElementArray = document.querySelectorAll("[data-show='user-rank']");
        this.treesPlantElement = document.querySelector("[data-show='trees-plant']");
        this.addUsersWrapper = document.querySelector("[data-add='users']");
        this.userDataElement = document.querySelector("[data-wrapper='clone-user']");
        this.openCloseCta = document.querySelector("[data-cta='toggle-leaderboard']");

        this.websiteShareLink = document.querySelectorAll("[data-ref='website']");
        this.facebookShareLink = document.querySelectorAll("[data-ref='facebook']");
        this.twitterShareLink = document.querySelectorAll("[data-ref='twitter']");
        this.gmailShareLink = document.querySelectorAll("[data-ref='gmail']");
        this.whatsappShareLink = document.querySelectorAll("[data-ref='whatsapp']");

        this.referralText = "Join me and the Moniflo community to change the future of finance. Sign up now and win rewards and get a 🌳 planted by @Moniflo";
        this.referralTextTwitter = "Join me and the Moniflo community to change the future of finance. Sign up now and win rewards and get a 🌳 planted by @Moniflo";
        this.referralTextWhatsapp = "I just signed up for Moniflo, to redefine the way we are investing. You should take a look. They are planting 🌳's for everyone who signs up.";
        this.referralSubjectMail = "Join me on Moniflo, and plant a 🌳!";
        this.referralBodyMail = `Hey, I really think you should check out this app, Moniflo.They are tackling so many great social, environmental, human rights issues by empowering our money! Plus they are planting 🌳's for everyone that joins their community.`;
        this.campaign;
        this.userInfo = null;
        this.init();
    }

    init() {
        this.startCampaign();
    }

    // function to start campaign
    async startCampaign() {
        // Get campaign by ID
        this.campaign = await ViralLoops.getCampaign(this.CAMPAIGNID);
        // console.log(this.campaign)
        if (this.campaign.isUserLoggedIn != undefined) {
            this.checkIfUserVerified();
        }
        else {
            window.location = "/";
        }
    }

    async checkIfUserVerified() {
        this.userInfo = await this.campaign.getUser(this.campaign.isUserLoggedIn);
        console.log(this.userInfo)
        if (this.userInfo.referralCode != undefined) {
            this.showData();
            this.openCloseLeaderBoard();
        }
        else {
            window.location = "/";
        }
    }

    async showData() {
        let { referralCount, referralUrls, leaderBoard, referralCode } = this.userInfo;
        let { rank } = await this.campaign.getRank(referralCode);
        let { emailRefUrl, facebookRefUrl, referralUrl, twitterRefUrl, whatsappRefUrl } = referralUrls;
        let slicedLeaderBoard = leaderBoard.slice(0, 100);

        if (this.userRankElementArray.length > 0) {
            for (let rankItem = 0; rankItem < this.userRankElementArray.length; rankItem++) {
                this.userRankElementArray[rankItem].textContent = `#${rank}`
            }
        }
        if (this.treesPlantElement != undefined) {
            this.treesPlantElement.textContent = referralCount + 1;
        }
        if (this.userDataElement != undefined && slicedLeaderBoard.length > 0) {
            if(slicedLeaderBoard.length>3)this.addUsersWrapper.style.overflow="auto";
            if(slicedLeaderBoard.length<=3)this.openCloseCta.style.display = "none";
            for (let leader = 0; leader < slicedLeaderBoard.length; leader++) {
                let { leadname } = slicedLeaderBoard[leader];
                let clonedWrapper = this.userDataElement.cloneNode(true);
                let rank = clonedWrapper.querySelector("[data-show='user-rank']");
                let userName = clonedWrapper.querySelector("[data-show='user-name']");
                userName.textContent = leadname.replace(".","");
                rank.textContent = leader + 1;
                this.addUsersWrapper.appendChild(clonedWrapper);
            }
            this.userDataElement.remove();

        }
        if(this.websiteShareLink.length>0 && this.facebookShareLink.length>0 && this.twitterShareLink.length>0 && this.whatsappShareLink.length>0 && this.gmailShareLink.length>0){
            for (let link = 0; link < this.websiteShareLink.length; link++) {
                this.websiteShareLink[link].textContent = referralUrl;
                this.facebookShareLink[link].setAttribute("href", this.createSocialMediaShareLink("facebook", facebookRefUrl, this.referralText))
                this.twitterShareLink[link].setAttribute("href", this.createSocialMediaShareLink("twitter", twitterRefUrl, this.referralTextTwitter));
                this.whatsappShareLink[link].setAttribute("href", this.createSocialMediaShareLink("whatsapp", whatsappRefUrl, this.referralTextWhatsapp));
                this.gmailShareLink[link].setAttribute("href", this.createSocialMediaShareLink("gmail", emailRefUrl, this.referralSubjectMail, this.referralBodyMail));
            }
        }

    }

    openCloseLeaderBoard(){
        if(this.openCloseCta != undefined){
            let wrapperOpenHeight;
            let wrapperCloseHeight;
            this.openCloseCta.setAttribute("open", false);
            this.addUsersWrapper.setAttribute("open-height", parseFloat(window.getComputedStyle(this.addUsersWrapper).maxHeight));
            this.addUsersWrapper.setAttribute("close-height", parseFloat(window.getComputedStyle(this.addUsersWrapper).height));

            wrapperOpenHeight = this.addUsersWrapper.getAttribute("open-height");
            wrapperCloseHeight = this.addUsersWrapper.getAttribute("close-height");

            this.openCloseCta.addEventListener("click",()=>{
                if(this.openCloseCta.getAttribute("open")=='false'){
                    this.openCloseCta.setAttribute("open", true);
                    this.addUsersWrapper.style.overflow="auto";
                    this.addUsersWrapper.style.height = `${wrapperOpenHeight}px`;
                    this.openCloseCta.style.transform = "rotate(180deg)";
                }
                else if(this.openCloseCta.getAttribute("open")=='true'){
                    this.openCloseCta.setAttribute("open", false);
                    // this.addUsersWrapper.style.overflow="hidden";
                    this.addUsersWrapper.style.height = `${wrapperCloseHeight}px`;
                    this.openCloseCta.style.transform = "rotate(0deg)";
                }
            })
        }
    }

    // Function to create social media share links
    createSocialMediaShareLink(platform, url, title, description="") {
        switch (platform) {
            case 'facebook':
                return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            case 'gmail':
                return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n${url}`)}`;
            case 'whatsapp':
                return `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
            default:
                return '';
        }
    }

}

window.addEventListener("load", new LEADERBOARD);