function cmsInjections(){
    let cardData = document.querySelector("[data-item='card']");
    let ctaCard = document.querySelector("[data-item='cta']");
    let injectCardElm = document.querySelectorAll("[data-move='card']");
    let injectCtaElm = document.querySelectorAll("[data-move='cta']");
    let blockQuoteHead = document.querySelector("[data-push='blockquote']");
    let blockQuoteInRichText = document.querySelector(".blog-rich-text").querySelectorAll("blockquote");
    if(cardData != undefined && injectCardElm.length > 0){
        injectCardElm.forEach(block => {
            block.appendChild(cardData.cloneNode(true));
        })
        cardData.remove();
    }
    else{
        cardData.remove();
    }

    if(ctaCard != undefined && injectCtaElm.length > 0){
        injectCtaElm.forEach(block => {
            block.appendChild(ctaCard.cloneNode(true));
        })
        ctaCard.remove();
    }else{
        ctaCard.remove();
    }

    if(blockQuoteHead != undefined && blockQuoteInRichText.length > 0){
        blockQuoteInRichText.forEach(block => {
            let paragraph = document.createElement("p");
            paragraph.innerText = block.innerText;
            paragraph.style.fontSize = 'inherit'
            block.innerHTML = '';
            block.appendChild(blockQuoteHead.cloneNode(true));
            block.appendChild(paragraph)
        })
        blockQuoteHead.parentElement.remove()
    }
    else{
        blockQuoteHead.parentElement.remove();
    }
}

cmsInjections()