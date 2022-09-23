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
    submitCta.addEventListener("click", () => {
        errorMessage.style.display = "none"
        if (validateEmail(emailField.value) && checkboxField.checked && TOKEN != null) {
            currForm.submit();
        } else if (!validateEmail(emailField.value)) {
            warningText.innerText = "Please enter your email address!";
            errorMessage.style.display = "block";
            setTimeout(()=>errorMessage.style.display = "none", 2000)
        }
        else if (!checkboxField.checked) {
            warningText.innerText = "Please tick the checkbox if you want to proceed!";
            errorMessage.style.display = "block";
            setTimeout(()=>errorMessage.style.display = "none", 2000)
        }
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
