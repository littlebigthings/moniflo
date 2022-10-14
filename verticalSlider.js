class VERTICALSLIDER {
    constructor() {
        this.sectionToAddTrigger = document.querySelector("[data-trigger='fix-section']");
        this.blockToMakeFix = document.querySelector("[data-block='to-fix']");
        this.allImage = document.querySelectorAll("[data-img]");
        this.slideBlocks = [...document.querySelectorAll("[data-block-slide]")];
        this.dots = [...document.querySelectorAll("[data-dot]")];
        this.isSlickActive = false;
        this.sliderOne = null;
        this.sliderTwo = null;
        this.init();
    }

    init() {
        this.addResizer();
        this.addClickToDots();
    }

    startTrigger() {
        if (this.slideBlocks.length <= 0) return;
        this.slideBlocks.forEach(slide => {
            ScrollTrigger.create({
                trigger: slide,
                start: "top 1px",
                end: "1px end",
                markers: true,
                onEnter: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    if (activeSlide != null) {
                        this.changeActiveImage(activeSlide);
                        if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                            this.makeElementFixed(false, true, false);
                        }
                        else if (self.trigger === this.slideBlocks[0]) {
                            this.makeElementFixed(false, false, true);
                        }
                    }
                },
                onEnterBack: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    if (activeSlide != null) {
                        this.changeActiveImage(activeSlide);
                        if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                            this.makeElementFixed(false, false, true);
                        }
                        else if (self.trigger === this.slideBlocks[0]) {
                            this.makeElementFixed(false, false, true)
                        }
                    }
                },
                onLeave: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    if (activeSlide != null) {
                        this.changeActiveImage(activeSlide);
                        if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                            this.makeElementFixed(false, true, false)
                        }
                    }
                },
                onLeaveBack: self => {
                    let activeSlide = self.trigger.getAttribute("data-block-slide");
                    if (activeSlide != null) {
                        this.changeActiveImage(activeSlide);
                        if (self.trigger === this.slideBlocks[this.slideBlocks.length - 1]) {
                            this.makeElementFixed(false, false, true);
                        }
                        else if (self.trigger === this.slideBlocks[0]) {
                            this.makeElementFixed(true, false, false)
                        }
                    }
                }
            });
        })
    }

    makeElementFixed(top, bottom, fixed) {
        if (this.blockToMakeFix == undefined) return;
        if (!top && bottom && !fixed) {
            this.blockToMakeFix.classList.remove("is-top");
            this.blockToMakeFix.classList.remove("is-fixed");
            this.blockToMakeFix.classList.add("is-bottom");
            // gsap.to(this.blockToMakeFix, {position:"absolute",bottom:0,duration:0.1})
        }
        else if (!top && !bottom && fixed) {
            this.blockToMakeFix.classList.remove("is-top");
            this.blockToMakeFix.classList.remove("is-bottom");
            this.blockToMakeFix.classList.add("is-fixed");
            // gsap.to(this.blockToMakeFix, {position:"fixed",duration:0.1})
        } else if (top && !bottom && !fixed) {
            this.blockToMakeFix.classList.remove("is-fixed");
            this.blockToMakeFix.classList.remove("is-bottom");
            this.blockToMakeFix.classList.add("is-top");
            // gsap.to(this.blockToMakeFix, {position:"absolute",top:0,duration:0.1})
        }
    }
    addClickToDots() {
        if (this.dots.length <= 0 && this.slideBlocks.length <= 0) return;
        this.dots.forEach(dot => {
            dot.addEventListener("click", (evt) => {
                let dotToActive = evt.currentTarget.getAttribute("data-dot");
                if (dotToActive != null) {
                    if (window.screen.width > 991) {
                        let slideToActive = this.slideBlocks.filter(slide => slide.getAttribute("data-block-slide") === dotToActive);
                        slideToActive[0].scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest",
                        })
                    } else if (window.screen.width <= 991) {
                        const currIdx = this.dots.indexOf(evt.currentTarget)
                        this.sliderOne.slick("slickGoTo", currIdx);
                        this.sliderTwo.slick("slickGoTo", currIdx);
                    }
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
        if (window.screen.width > 991) {
            this.isSlickActive = false;
            this.startTrigger();
        }
        else if (window.screen.width <= 991) {
            this.isSlickActive = true;
            this.addSlider();
        }
        window.addEventListener("resize", () => {
            if (window.screen.width <= 991 && !this.isSlickActive) {
                this.isSlickActive = true;
                this.blockToMakeFix.classList.remove("is-fixed");
                this.blockToMakeFix.classList.remove("is-bottom");
                this.blockToMakeFix.classList.add("is-top");
                let Alltrigger = ScrollTrigger.getAll()
                for (let i = 0; i < Alltrigger.length; i++) {
                    Alltrigger[i].kill(true)
                }
                this.addSlider();
            } else if (window.screen.width > 991 && this.isSlickActive) {
                this.isSlickActive = false;
                if (this.sliderOne) this.sliderOne.slick('unslick');
                if (this.sliderTwo) this.sliderTwo.slick('unslick');
                this.startTrigger();
            }
        })
    }

    addSlider() {
        this.sliderOne = $(this.allImage[0].parentElement).slick({
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: false,
            autoplay: false,
            arrows: false,
            speed: 200,
            asNavFor: this.sliderTwo,
        });
        this.sliderTwo = $(this.slideBlocks[0].parentElement).slick({
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: false,
            autoplay: false,
            arrows: false,
            speed: 200,
            appendDots: this.dots,
            asNavFor: this.sliderOne,
        });
        this.sliderOne.on('beforeChange', (event, slick, currentSlide, nextSlide)=>{
            this.dots.forEach((dot, index) => {
                if (index == nextSlide) {
                    this.sliderTwo.slick("slickGoTo", index);
                    dot.classList.add("is-active");
                }
                else {
                    dot.classList.remove("is-active");
                }
            })
          });
    }
}
window.addEventListener("load", ()=>{
    new VERTICALSLIDER;
})