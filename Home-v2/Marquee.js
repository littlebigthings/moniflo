function Marquee(element) {
    let scrollElem = element //Add this data attribute to the slider wrapper.
    if (scrollElem != undefined || scrollElem != null) {
        $(scrollElem).marquee({
            //duration in milliseconds of the marquee
            duration: 20000,
            //gap in pixels between the tickers
            gap: 0,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 200,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            startVisible: true,
        });
    }
}
const $allMarquee = document.querySelectorAll("[marquee='left']");
if($allMarquee.length>0){
    $allMarquee.forEach(item => {
        Marquee(item);
    })
}