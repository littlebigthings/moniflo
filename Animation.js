function animateFromTopBtm() {
    let trigger = document.querySelectorAll("[data-animate='trigger-top-btm']");
    let items = document.querySelectorAll("[data-animate='top-btm']");
    let timeline = gsap.timeline();
    if (trigger != undefined && items.length > 0) {
        gsap.set(items, { opacity: 0, y: "-20px" })
        trigger.forEach(triggerItem => {
            ScrollTrigger.create({
                trigger: triggerItem,
                start: "top 50%",
                onEnter: self => {
                    let animItem = self.trigger.querySelectorAll("[data-animate='top-btm']");
                    if (animItem.length > 0) {
                        timeline.to(animItem, {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            stagger: 0.2,
                            ease: "linear",
                        })
                    }
                    self.disable();
                }
            })
        })
    }
};

function animateFromBtmTop() {
    let trigger = document.querySelectorAll("[data-animate='trigger-btm-top']");
    let items = document.querySelectorAll("[data-animate='btm-top']");
    let timeline = gsap.timeline();
    if (trigger != undefined && items.length > 0) {
        gsap.set(items, { opacity: 0, y: "20px" })
        trigger.forEach(triggerItem => {
            ScrollTrigger.create({
                trigger: triggerItem,
                start: "top 50%",
                onEnter: self => {
                    let animItem = self.trigger.querySelectorAll("[data-animate='btm-top']");
                    if (animItem.length > 0) {
                        timeline.to(animItem, {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            stagger: 0.2,
                            ease: "linear",
                        })
                    }
                    self.disable();
                }
            })
        })
    }
};

function animateLeftRight() {
    let trigger = document.querySelectorAll("[data-animate='trigger-left-right']");
    let itemsLeft = document.querySelectorAll("[data-animate='left-right']");
    let itemsRight = document.querySelectorAll("[data-animate='right-left']")
    let timeline = gsap.timeline();
    if (trigger != undefined && itemsLeft.length > 0 && itemsRight.length>0) {
        gsap.set(itemsLeft, { opacity: 0, x: "-50px" })
        gsap.set(itemsRight, { opacity: 0, x: "50px" })
        trigger.forEach(triggerItem => {
            ScrollTrigger.create({
                trigger: triggerItem,
                start: "top 50%",
                onEnter: self => {
                    let animItemLeft = self.trigger.querySelectorAll("[data-animate='left-right']");
                    let animItemRight = self.trigger.querySelectorAll("[data-animate='right-left']");
                    if (animItemLeft.length > 0 && animItemRight.length > 0) {
                        timeline.to(animItemLeft, {
                            opacity: 1,
                            x: 0,
                            duration: 0.3,
                            stagger: 0.2,
                            ease: "linear",
                        })
                    }
                    timeline.to(animItemRight, {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        stagger: 0.2,
                        ease: "linear",
                    })
                    self.disable();
                }
            })
        })
    }
};

if (window.screen.width > 768) {
    animateFromTopBtm();
    animateFromBtmTop();
    animateLeftRight();
}