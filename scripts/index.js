function getBrightness(color) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

function adjustTextColorBasedOnBackground(element) {
    const backgroundImage = window.getComputedStyle(element).backgroundImage;
    const regex = /url\("?(.+?)"?\)/;
    const url = regex.exec(backgroundImage)[1];
    const img = new Image();
    img.src = url;

    img.onload = function () {
        const color = getAverageColor(img);
        const brightness = getBrightness(color);
        const textColor = brightness > 125 ? '#000000' : '#FFFFFF';
        element.querySelectorAll('.content, .title').forEach(el => {
            el.style.color = textColor;
        });
    }
}

function getAverageColor(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

    const imageData = context.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return `#${("0" + r.toString(16)).slice(-2)}${("0" + g.toString(16)).slice(-2)}${("0" + b.toString(16)).slice(-2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section.parallax');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                adjustTextColorBasedOnBackground(entry.target);
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
