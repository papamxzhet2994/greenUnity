let isNavOpen = false;
let isNavClosing = false;

function toggleNav() {
    const nav = document.querySelector('.header-nav');
    const toggleIcon = document.querySelector('.header-toggle i');

    if (isNavOpen) {
        isNavClosing = true;
        setTimeout(() => {
            isNavOpen = false;
            isNavClosing = false;
            nav.classList.remove('active');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-grip-lines');
        }, 500);
    } else {
        isNavOpen = true;
        nav.classList.add('active');
        toggleIcon.classList.remove('fa-grip-lines');
        toggleIcon.classList.add('fa-times');
    }
}