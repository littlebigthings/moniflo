Weglot.on("initialized", () => {
    const videoWrapper = document.getElementById("dynamic-video");
    const videoCta = document.querySelector("[update-video='url']");
    const newLang = Weglot.getCurrentLang();
    if(newLang == 'en'){
        if(videoWrapper!=null &&videoCta != null){
               videoWrapper.innerHTML="";
 videoWrapper.setAttribute("src","https://www.youtube.com/embed/1Bpfe1hwfwI?rel=0&modestbranding=1&showinfo=0")
 videoCta.setAttribute("src","https://youtu.be/1Bpfe1hwfwI")
        }
    }
})