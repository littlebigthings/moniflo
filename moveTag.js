function moveTagsInsideCard(){
    let allTags = document.querySelectorAll("[data-item='tags']");
    if(allTags.length > 0){
        allTags.forEach(tag => {
            let elmentToInsertTag = tag.parentElement.querySelector("[data-insert='tags']");
            if(elmentToInsertTag != null)elmentToInsertTag.appendChild(tag);
        })
    }
}

function onPageChange(){
    let paginationCta = document.querySelectorAll(".pagination_page-button");
    console.log(paginationCta)
    if(paginationCta.length > 0){
        paginationCta.forEach(cta => {
           cta.addEventListener('click',()=>{
               console.log('click')
               setTimeout(()=>moveTagsInsideCard(),200)
           })
        })
    }
}

function loadScript() {
    let script = ['https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js']
        injectScript(script)
            .then(() => {
                console.log('Script loaded!');
                moveTagsInsideCard();
                setTimeout(() => onPageChange(), 300)

            }).catch(error => {
                console.error(error);
            });
}

function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', e => reject(e.error));
        document.body.appendChild(script);
    });
}

loadScript();