class Artwork {
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
        this.imageHeight = this.image.height;
        this.imageWidth = this.image.width;
        this.imageLongDimension = this.image.width >= this.image.height ? this.image.width : this.image.height;
        this.imageShortDimension = this.image.width < this.image.height ? this.image.width : this.image.height;
        this.imageAspectRatio = this.image.width > this.image.height ? this.image.width / this.image.height : this.image.height / this.image.width;
    }
}

const artwork = new Artwork('/images/Walker-Evans_New-Orleans-Street-Corner.jpg')

// CANVAS SETUP //
const canvas = document.querySelector('#designer');
const context = canvas.getContext('2d');
// set the canvas to fill parent div
const container = canvas.parentNode;
// the padding of the container is calculated using calc() and equal on both sides
let containerPadding = parseInt(window.getComputedStyle(container).paddingRight) * 2
canvas.width = container.offsetWidth - containerPadding
canvas.height = container.offsetHeight - containerPadding

// SELECTORS //
// const imageWidth = document.querySelector('#imageWidth');
// const imageHeight = document.querySelector('#imageHeight');
// const borderRange = document.querySelector('#borderRange');
const borders = document.querySelector('#borders').innerHTML;
console.log(borders)


// EVENT HANDELERS //
// window.addEventListener('load', draw(borderRange.value));
artwork.image.onload = () => {
    draw(Number(borders));
}

// DRAWING METHODS //

function calculateImageDesplaySize() {
    if (canvas.width >= canvas.height) {
        artwork.longDimension = (canvas.width - 300)
        artwork.shortDimension = (canvas.width - 300) / artwork.imageAspectRatio
    } else {
        artwork.longDimension = (canvas.height - 300)
        artwork.shortDimension = (canvas.height - 300) / artwork.imageAspectRatio
    }
}

// default shadow parameters
function dropShadow() {
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 20;
  context.shadowColor = 'rgba(30,30,30, 0.7)';
}

// draws the image in the center of the canvas
function loadImage() {
    if (artwork.imageWidth >= artwork.imageHeight) {
        context.drawImage(
            artwork.image,
            Math.abs(canvas.width / 2 - artwork.longDimension/2),
            Math.abs(canvas.height / 2 - artwork.shortDimension / 2),
            artwork.longDimension,
            artwork.shortDimension
        );
    } else {  
        context.drawImage(
            artwork.image,
            Math.abs(canvas.width / 2 - artwork.longDimension/2),
            Math.abs(canvas.height / 2 - artwork.shortDimension / 2),
            artwork.longDimension,
            artwork.shortDimension,
        );
    }
}

// let border = 0;
function draw(borderSize) {
    calculateImageDesplaySize()
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Shadow parameters
    dropShadow();
    
    context.beginPath();
    if (artwork.imageWidth >= artwork.imageHeight) {
        context.rect(
            (canvas.width / 2 - artwork.longDimension / 2) - (Number(borderSize) / 2),
            (canvas.height / 2 - artwork.shortDimension / 2) - (Number(borderSize) / 2),
            artwork.longDimension + Number(borderSize),
            artwork.shortDimension + Number(borderSize),
            );
    } else {
         context.rect(
            canvas.width / 2 - artwork.shortDimension / 2,
            canvas.height / 2 - artwork.longDimension / 2,
            artwork.longDimension,
            artwork.shortDimension
        );
    }
    context.fillStyle = '#fff';
    context.fill();
    context.shadowColor = 'transparent';
    loadImage();
  }