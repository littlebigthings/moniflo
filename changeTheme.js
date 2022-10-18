function changeTheme(){
    let pageBackground = document.body.style.backgroundColor;
    let themeMetaElm = document.querySelector('meta[name="theme-color"]');
    if(pageBackground.length > 0 && themeMetaElm != undefined){
        themeMetaElm.setAttribute("content", pageBackground)
    }
}

changeTheme();