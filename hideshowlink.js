function showAndHideCta(langData) {
    let currentURL = document.location.hostname;
    let allGermanLinks = document.querySelectorAll("[data-img='de']");
    let allEnglishLinks = document.querySelectorAll("[data-img='en']");
    if (allEnglishLinks && allGermanLinks && allEnglishLinks.length > 0 && allGermanLinks.length > 0) {
        if (langData == "en") {
            allEnglishLinks.forEach((item, index) => {
                item.style.display = "block";
                allGermanLinks[index] ? allGermanLinks[index].style.display = "none" : "";
            })
        } else if (langData == "de") {
            allGermanLinks.forEach((item, index) => {
                item.style.display = "block";
                allEnglishLinks[index] ? allEnglishLinks[index].style.display = "none" : "";
            })
        }
    }
}

Weglot.on("languageChanged", function(newLang, prevLang) {
    showAndHideCta(newLang);
})
Weglot.on("switchersReady", function(initialLanguage) {
   showAndHideCta(initialLanguage)
  })