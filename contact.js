//Use an eventlistener for the contact form.
const email = document.getElementById("e-mail");
const commentaar = document.getElementById("Commentaar");
const errorblock = document.getElementById("errors");
const CreateUserForm = document.getElementById("CreateUserForm");


CreateUserForm.addEventListener("submit", (e) => {
    let errors = [];
    if (email.value === '' || email.value === null) {
        errors.push("E-mail is verplicht.")
    }
    if (commentaar.value === '' || commentaar.value === null) {
        errors.push("Commentaar is verplicht.")
    }
    if (errors.length > 0) {
        e.preventDefault()
        errorblock.innerText = errors.join(', ');
    }
})

//use an intersection on the contact form
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach((el) => observer.observe(el));
