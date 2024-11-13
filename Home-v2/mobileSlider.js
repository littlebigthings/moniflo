class addSlickSlider {
    constructor(sliderObj) {
        this.sliderObj = sliderObj;
        this.$sliderParent = this.sliderObj.sliderParent;
        this.dots = this.sliderObj.dots ?? true;
        this.slidesToScroll = this.sliderObj.slidesToScroll ?? 2;
        this.slidesToShow = this.sliderObj.slidesToShow ?? 4;
        this.infinite = this.sliderObj.infinite ?? false;
        this.autoplay = this.sliderObj.autoplay ?? true;
        this.autoplaySpeed = this.sliderObj.autoplaySpeed ?? 1000;
        this.arrows = this.sliderObj.arrows ?? true;
        this.speed = this.sliderObj.speed ?? 500;
        this.fade = this.sliderObj.fade ?? false;
        this.prevArrow= this.$sliderParent[0].querySelector("[data-arrow='prev']"),
        this.nextArrow= this.$sliderParent[0].querySelector("[data-arrow='next']"),
        this.centerMode = this.sliderObj.centerMode ?? false;
        this.showonRespo = this.sliderObj.responsive;
        this.initElement();
    }

    initElement() {
        if (this.$sliderParent.length <= 0) return;
        this.$sliderParent.forEach(element => {
            let sliderWrapper = element.querySelector("[slick-slider='slider-child']");//Add this attribute to slider item.
            let $paginationBox = element.querySelector("[slick-slider='bread-crums-box']"); //Add this attribute to pagination dot wrapper.
            this.activateSlider({ sliderWrapper, $paginationBox });
        });
    }

    activateSlider(sliderObj) {
        let sliderControl = $(sliderObj.sliderWrapper).slick({
            dots: this.dots,
            slidesToShow: this.slidesToShow,
            slidesToScroll: this.slidesToScroll,
            centerMode: this.centerMode,
            infinite: this.infinite,
            autoplay: this.autoplay,
            autoplaySpeed: this.autoplaySpeed,
            arrows: this.arrows,
            speed: this.speed,
            fade: this.fade,
            prevArrow: this.prevArrow,
            nextArrow: this.nextArrow,
            appendDots: this.dots != false ? sliderObj.$paginationBox : "none", //set this wrapper to relative
            variableWidth:true,
            adaptiveHeight:true,
        });
    }
}
// activate slider
let sliderObjWithDots = {
    sliderParent: document.querySelectorAll("[slick-slider='with-dots']"),
    slidesToShow: 1,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 800,
    fade: false,
    centerMode: true,
    dots: true,
    arrows: false,
    responsive: 1,
}
let sliderObjWithArrow = {
    sliderParent: document.querySelectorAll("[slick-slider='with-arrow']"),
    slidesToShow: 1,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 800,
    fade: false,
    centerMode: true,
    dots: false,
    arrows: true,
    responsive: 1,
}

new addSlickSlider(sliderObjWithDots);
if(window.innerWidth<768){
   new addSlickSlider(sliderObjWithArrow);
}