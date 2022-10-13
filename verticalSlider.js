class VERTICALSLIDER {
    constructor() {
        this.sectionToAddTrigger = document.querySelector("[data-trigger='fix-section']");
        this.blockToMakeFix = document.querySelector("[data-block='to-fix']");
        this.allImage = document.querySelectorAll("[data-img]");
        this.slideBlocks = [...document.querySelectorAll("[data-block-slide]")];
        this.dots = document.querySelectorAll("[data-dot]");
        this.isSlickActive = false;
        this.init();
    }

    init() {
        this.addResizer();
        this.addClickToDots();
    }

    startTrigger() {
        this.slideBlocks.forEach(slide => {
            ScrollTrigger.create({
                trigger: slide,
                start: "top 1%",
                end: "end end",
                markers: true,
                onEnter: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    this.changeActiveImage(activeSlide);
                    if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                        this.makeElementFixed(false, true, false);
                    }
                    else if (self.trigger === this.slideBlocks[0]) {
                        this.makeElementFixed(false, false, true);
                    }
                    console.log("entered")
                },
                onEnterBack: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    this.changeActiveImage(activeSlide);
                    if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                        this.makeElementFixed(false, false, true);
                    }
                    else if (self.trigger === this.slideBlocks[0]) {
                        this.makeElementFixed(false, false, true)
                    }
                    console.log("enteredBack")
                },
                onLeave: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    this.changeActiveImage(activeSlide);
                    if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                        this.makeElementFixed(false, true, false)
                    }
                    console.log("leave")

                },
                onLeaveBack: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    this.changeActiveImage(activeSlide);
                    if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                        this.makeElementFixed(false, false, true);
                    }
                    else if (self.trigger === this.slideBlocks[0]) {
                        this.makeElementFixed(true, false, false)
                    }
                    console.log("leaveBack")

                }
            });
        })
    }

    makeElementFixed(top, bottom, fixed) {
        if (!top && bottom && !fixed) {
            this.blockToMakeFix.classList.remove("is-top");
            this.blockToMakeFix.classList.remove("is-fixed");
            this.blockToMakeFix.classList.add("is-bottom");
        }
        else if (!top && !bottom && fixed) {
            this.blockToMakeFix.classList.remove("is-top");
            this.blockToMakeFix.classList.remove("is-bottom");
            this.blockToMakeFix.classList.add("is-fixed");
        } else if (top && !bottom && !fixed) {
            this.blockToMakeFix.classList.remove("is-fixed");
            this.blockToMakeFix.classList.remove("is-bottom");
            this.blockToMakeFix.classList.add("is-top");
        }
    }
    addClickToDots() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", (evt) => {
                let dotToActive = evt.currentTarget.getAttribute("data-dot");
                if(window.screen.width > 768){
                    let slideToActive = this.slideBlocks.filter(slide => slide.getAttribute("data-block-slide") === dotToActive);
                    slideToActive[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    })
                }else if(window.screen.width <= 768){
                    console.log("slickListener")
                }
            })
        })
    }

    changeActiveImage(activeSlide) {
        this.allImage.forEach(img => {
            if (img.getAttribute("data-img") == activeSlide) {
                img.classList.add("is-active");
            }
            else {
                img.classList.remove("is-active");
            }
        })
        this.dots.forEach(dot => {
            if (dot.getAttribute("data-dot") == activeSlide) {
                dot.classList.add("is-active");
            }
            else {
                dot.classList.remove("is-active");
            }
        })
    }

    addResizer() {
        if (window.screen.width > 768) {
            this.startTrigger();
        };
        window.addEventListener("resize", () => {
            if (window.screen.width <= 768 && !this.isSlickActive) {
                console.log("activateSlick");
                this.isSlickActive = true;
                let Alltrigger = ScrollTrigger.getAll()
                for (let i = 0; i < Alltrigger.length; i++) {
                    Alltrigger[i].kill(true)
                }
            } else if (window.screen.width > 768 && this.isSlickActive) {
                this.isSlickActive = false;
                console.log("deActivateSlick");
                this.startTrigger();
            }
        })
    }
}

new VERTICALSLIDER;