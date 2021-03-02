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

// Image //
// const image = new Image();
// image.src = '/images/Walker-Evans_New-Orleans-Street-Corner.jpg';


// Canvas

// const ranges = document.querySelectorAll('.controls input');
const borderRange = document.querySelector('#borderRange');
const canvas = document.querySelector('#designer');
const context = canvas.getContext('2d');

const container = canvas.parentNode;
// the padding is calculated using calc() and equal on both sides
let containerPadding = parseInt(window.getComputedStyle(container).paddingRight) * 2
// set width and height based on the containing div
canvas.width = container.offsetWidth - containerPadding
canvas.height = container.offsetHeight - containerPadding
let border = 0;

function draw() {
    calculateImageDesplaySize()
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Shadow parameters
    dropShadow();
    
    context.beginPath();
    if (artwork.imageWidth >= artwork.imageHeight) {
        context.rect(
            (canvas.width / 2 - artwork.longDimension / 2) - (Number(border) / 2),
            (canvas.height / 2 - artwork.shortDimension / 2) - (Number(border) / 2),
            artwork.longDimension + Number(border),
            artwork.shortDimension + Number(border),
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

function dropShadow() {
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 20;
  context.shadowColor = 'rgba(30,30,30, 0.7)';
}

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

function calculateImageDesplaySize() {
    if (canvas.width >= canvas.height) {
        artwork.longDimension = (canvas.width - 300)
        artwork.shortDimension = (canvas.width - 300) / artwork.imageAspectRatio
    } else {
        artwork.longDimension = (canvas.height - 300)
        artwork.shortDimension = (canvas.height - 300) / artwork.imageAspectRatio
    }
}

function handleRangeUpdate(e) {
  border = e.target.value;
  draw();
}

function setImageSize(){
    if (!imageHeight.value && !imageHeight.value) {
        imageHeight.value = (artwork.imageHeight / 72).toFixed(2)// dpi
        imageWidth.value = (artwork.imageWidth / 72).toFixed(2)// dpi
    } 
}

function handleSizeChange(e) {
    if (e.target == imageWidth) {
        if (e.target.value >= imageHeight.value) {
            imageHeight.value = (e.target.value / artwork.imageAspectRatio).toFixed(2)
        } else {
            imageHeight.value = (e.target.value * artwork.imageAspectRatio).toFixed(2)
        }
    } else {
        if (e.target.value >= imageWidth.value) {
            imageWidth.value = (e.target.value / artwork.imageAspectRatio).toFixed(2)
        } else {
            imageWidth.value = (e.target.value * artwork.imageAspectRatio).toFixed(2)
        }
    }
}


const imageWidth = document.querySelector('#imageWidth');
const imageHeight = document.querySelector('#imageHeight');

window.addEventListener('load', draw);
window.addEventListener('load', setImageSize);
imageWidth.addEventListener('change', handleSizeChange);
imageHeight.addEventListener('change', handleSizeChange);

let mouseDown = false;
borderRange.addEventListener('mousedown', () => (mouseDown = true))
borderRange.addEventListener('mouseup', () => (mouseDown = false))
borderRange.addEventListener('mousemove', e => mouseDown && handleRangeUpdate(e))

// Image
// function setImage{}
// links = document.querySelectorAll('.header-nav-item a');
// links.forEach(link => {
//   link.addEventListener('click', e => preventDefault(e));
// });
