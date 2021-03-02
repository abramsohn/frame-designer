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
const imageWidth = document.querySelector('#imageWidth');
const imageHeight = document.querySelector('#imageHeight');
const borderRange = document.querySelector('#borderRange');
console.log(borderRange)
// EVENT HANDELERS //

let mouseDown = false;
borderRange.addEventListener('mousedown', () => (mouseDown = true))
borderRange.addEventListener('mouseup', () => (mouseDown = false))
borderRange.addEventListener('mousemove', e => mouseDown && handleRangeUpdate(e))

imageHeight.addEventListener('change', handleSizeInputChange);
imageWidth.addEventListener('change', handleSizeInputChange);
window.addEventListener('load', setImageSizeInputs);
window.addEventListener('load', draw(borderRange.value));

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
    context.clearRect(0, 0, canvas.width, canvas.height);
    calculateImageDesplaySize()
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


// Update the canvas when user changes the border size
function handleRangeUpdate(e) {
//   border = e.target.value;
//   draw();
  draw(e.target.value);
}

// initialize the image size based on the image aspect ratio at 72dpi
function setImageSizeInputs(){
    if (!imageHeight.value && !imageHeight.value) {
        imageHeight.value = (artwork.imageHeight / 72).toFixed(2)
        imageWidth.value = (artwork.imageWidth / 72).toFixed(2)
    } 
}

// When the user update one of the size inputs, automaticly update the other one to conform to the aspect ratio of the image
function handleSizeInputChange(e) {
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