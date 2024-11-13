class VIDEOCONTROLLER {
    constructor() {
        this.$videoSection = document.querySelector("[wrapper-type='video']");
        this.$contentTab = [...this.$videoSection?.querySelectorAll("[video-tab]")];
        this.$videos = this.$videoSection?.querySelectorAll("[video]");
        this.$videoDesktopMoveAbove = this.$videoSection?.querySelector("[move-position='desktop']");
        this.$elementToMove = this.$videoSection?.querySelector("[move-element='mobile']");
        this.activeTab = 0;
        this.elementMovedBack = true;
        this.init();
    }

    init() {
        this.startListener();
        this.handleResize();
        window.addEventListener("resize", () => this.handleResize());
    }

    startListener() {
        if (this.$contentTab?.length > 0) {
            this.$contentTab.forEach(tab => {
                tab.addEventListener("click", () => {
                    const tabIndex = tab?.getAttribute("video-tab");
                    this.activeTab = this.$contentTab.indexOf(tab);
                    if (this.$videos?.length > 0) {
                        this.$videos.forEach(async (video, index) => {
                            const videoIndex = video?.getAttribute("video");
                            const videoPlayer = video?.querySelector("video");
                            if (tabIndex === videoIndex) {
                                tab.classList.add("active");
                                video.classList.add("active");
                                await videoPlayer.play();
                                if (window.innerWidth < 768) {
                                    this.elementMovedBack = false;
                                    const insertBelow = this.$contentTab[this.activeTab];
                                    insertBelow.insertAdjacentElement("afterend", this.$elementToMove);
                                }
                            }
                            else {
                                const deactivateTab = this.$contentTab[index];
                                deactivateTab.classList.remove("active");
                                video.classList.remove("active")
                                await videoPlayer.pause();
                                videoPlayer.currentTime=0;
                            }
                        })

                    }
                })
            })
        }
    }
    handleResize() {
        if (window.innerWidth < 768 && this.elementMovedBack) {
            this.elementMovedBack = false;
            const insertBelow = this.$contentTab[this.activeTab];
            insertBelow.insertAdjacentElement("afterend", this.$elementToMove);
        } else if (window.innerWidth >= 768 && this.elementMovedBack == false) {
            this.elementMovedBack = true;
            this.$videoDesktopMoveAbove.insertAdjacentElement("afterbegin", this.$elementToMove);
        }
    }
}

new VIDEOCONTROLLER();