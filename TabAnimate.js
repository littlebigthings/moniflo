class TabSlider {
    constructor(
        {
            sliderTabs,
            activeCardClass = "active-card",
            aniDuration = 0.7,
            sectionEle
        }
    ) {
        this.$sliderTabs = sliderTabs;
        this.currTab = 0;
        this.activeCardClass = activeCardClass;

        this.isRunning = false;
        this.aniDuration = aniDuration;
        this.closeTab = this.closeTab.bind(this);
        this.imageToMove = sectionEle.querySelector("[img='put']");

        this.init();
    }

    init() {

        this.activateEvents();
        this.addTabHeights();
        this.checkOnResize();
    }

    addTabHeights() {
        for (let tab = 0; tab < this.$sliderTabs.length; tab++) {
            const currTab = this.$sliderTabs[tab].querySelector("[wrapper='platform-content']");
            const tabChild = [...currTab.children];
            let elHeight = 0;
            for (let child = 0; child < tabChild.length; child++) {
                const element = tabChild[child];
                if (element.style.display != "none") {
                    elHeight = elHeight + parseInt(element.getBoundingClientRect().height) + parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'));
                }
                currTab.setAttribute("tab-height", elHeight)
            }
        }
    }

    activateEvents() {
        for (let wrapper = 0; wrapper < this.$sliderTabs.length; wrapper++) {
            const tabWrapper = this.$sliderTabs[wrapper];
            tabWrapper.addEventListener("click", (e) => {
                const $currTab = e.currentTarget;
                if (!$currTab.classList.contains(this.activeCardClass)) {
                    this.openTab($currTab, true);
                }
            })
        }
        this.$sliderTabs[0].click();
    }


    openTab(ele) {
        const $currTab = ele;
        const $btmTab = $currTab.querySelector("[wrapper='platform-content']");
        const $imageEle = $currTab.querySelector("[img='get']");
        const $imgSrc = $imageEle?.getAttribute("src");
        const $imgSrcSet = $imageEle?.getAttribute("srcset");

        $currTab.classList.add(this.activeCardClass);

        gsap.to(this.imageToMove, {
            x: "-40px",
            opacity: 0,
            duration: 0,
            onComplete: () => {
                this.imageToMove.setAttribute("src", $imgSrc);
                this.imageToMove.setAttribute("srcset", $imgSrcSet);
            },
            ease:"ease-in-out",
        }).then(() => {
            gsap.to(this.imageToMove, {
                x: "40px",
                duration: 0,
                ease:"ease-in-out",
            })
            gsap.to(this.imageToMove, {
                x: 0,
                opacity: 1,
                duration: 0.2,
                ease:"ease-in-out",
            })
        })


        gsap.to($btmTab, {
            height: `${$btmTab.getAttribute("tab-height")}px`,
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });


        const otherTabs = this.$sliderTabs.filter(tab => tab != $currTab);
        [...otherTabs].forEach(this.closeTab);

        this.currTab = this.$sliderTabs.indexOf($currTab) + 1;
    }

    closeTab(ele) {
        const $currTab = ele;
        const $btmTab = $currTab.querySelector("[wrapper='platform-content']");
        $currTab.classList.remove(this.activeCardClass);

        gsap.to($btmTab, {
            height: "0px",
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });

    }

    checkOnResize() {
        window.addEventListener('resize', this.debounce(this.resetAnimation), false)
    }

    resetAnimation() {
        let tabsToReset = this.$sliderTabs;
        tabsToReset.forEach(tab => {
            tab.classList.remove(this.activeCardClass)
            const resetHeight = tab.querySelector("[wrapper='platform-content']")
            resetHeight.style.height = "auto";
        })
        this.addTabHeights();
        this.$sliderTabs[0].click();
    }

    debounce(func, timeout = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout)
        }
    };

}

const $tabSecOne = document.querySelector("[wrapper='platform']");
if ($tabSecOne != undefined) {

    const tabCardsData = [
        {
            sliderTabs: [...$tabSecOne.querySelectorAll("[wrapper='comp-item']")],
            sectionEle: $tabSecOne,
            aniDuration: 0.5,
        },
    ];
    tabCardsData.forEach((echObj) => {
        const tabSlider = new TabSlider(echObj);
    });
}
