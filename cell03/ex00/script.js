const button = document.getElementById('colorBtn');


function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}


button.addEventListener('click', function () {

    const r = getRandomColorValue();
    const g = getRandomColorValue();
    const b = getRandomColorValue();


    const randomColor = `rgb(${r}, ${g}, ${b})`;


    document.body.style.backgroundColor = randomColor;
});