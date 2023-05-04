let allForms = document.querySelectorAll("[data-wrapper='form']");
let TOKEN = null;
function captchaValidation(form) {
    if (form == undefined) return;
    let currForm = form;
    let emailField = form.querySelector("[data-item='email']");
    let checkboxField = form.querySelector("[data-item='checkbox']");
    let errorMessage = form.parentElement.querySelector("[data-wrapper='error']");
    let warningText = errorMessage.querySelector("[data-text='warning-text']")
    let submitCta = form.querySelector("[data-cta='submit']");
  	submitCta.classList.add("g-recaptcha");
    submitCta.addEventListener("click", () => {
        form.requestSubmit()
        errorMessage.style.display = "none"
        // if (validateEmail(emailField.value) && checkboxField.checked && TOKEN != null) {
        //     currForm.submit();
        // } 
        // else if (!validateEmail(emailField.value)) {
        //     if(document.location.hostname == "en.moniflo.com"){
        //       warningText.innerText = "Please enter your email address";
        //     }
        //   else if(document.location.hostname == "www.moniflo.com"){
        //     warningText.innerText = "Gib bitte deine E-Mail-Adresse ein";
        //   }else{
        //   	warningText.innerText = "Please enter your email address";
        //   }
        //     errorMessage.style.display = "block";
        //     setTimeout(()=>errorMessage.style.display = "none", 2000)
        // }
        // else if (!checkboxField.checked) {
        //    if(document.location.hostname == "en.moniflo.com"){
        //     warningText.innerText = "Please tick the checkbox if you want to proceed";
        //    }
        //   else if(document.location.hostname == "www.moniflo.com"){
        //     warningText.innerText = "Akzeptiere bitte die Datenschutzrichtlinien, um fortzufahren";
        //   }else{
        //   	warningText.innerText = "Please tick the checkbox if you want to proceed";
        //   }
        //     errorMessage.style.display = "block";
        //     setTimeout(()=>errorMessage.style.display = "none", 2000)
        // }
    })
}

if (allForms.length > 0) {
    allForms.forEach(form => {
        captchaValidation(form)
    })
}

function validateEmail(email) {
    return email.match(
        /^(.+)@(.+)$/
    );
};


function onSubmit(token) {
    TOKEN = token;
}