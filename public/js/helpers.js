const flash = document.querySelector('#flash');
if (flash) {
    setTimeout(() => {
        flash.classList.add('hide')
    }, 2000);
}