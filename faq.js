let vragen = document.getElementsByClassName("vragen");

for (const box of vragen) {
    box.addEventListener('click', function handleClick() {
        let vraag = box.nextElementSibling
        if (vraag.style.display === 'none') {
            vraag.style.display = 'block';
        } else {
            vraag.style.display = 'none';
        }
    });
}

let plusbuttons = document.getElementsByClassName("plusbutton");

for (const plusbutton of plusbuttons) {
    plusbutton.addEventListener('click', function handleClick() {

        let vraag = document.getElementById(plusbutton.dataset.target);
        if (vraag.style.display === 'none') {
            vraag.style.display = 'block';
        } else {
            vraag.style.display = 'none';
        }
    });
}