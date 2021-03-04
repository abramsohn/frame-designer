class Artwork {
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
        this.imageHeight = this.image.height;
        this.imageWidth = this.image.width;
        this.imageLongDimension = this.image.width >= this.image.height ? this.image.width : this.image.height;
        this.imageShortDimension = this.image.width < this.image.height ? this.image.width : this.image.height;
        this.imageAspectRatio = this.image.width > this.image.height ? this.image.height / this.image.width : this.image.width / this.image.height;
        this.orientation = this.image.width >= this.image.height ? 'landscape' : 'portrait'
        this.previousValue = null;
        this.resolution = null;

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
const inputs = document.querySelectorAll('input[type=text]');
const bubble = document.querySelector('#bubble');
const resolution = document.querySelector('#resolution');
// EVENT HANDELERS //
let mouseDown = false;
borderRange.addEventListener('mousedown', () => (mouseDown = true));
borderRange.addEventListener('mouseup', () => (mouseDown = false));
borderRange.addEventListener('mousemove', (e) => mouseDown && handleRangeUpdate(e));
borderRange.addEventListener('input', (e) => {
    bubble.innerHTML = `${(e.target.value / artwork.resolution).toFixed(2)}"`;
});

imageHeight.addEventListener('change', handleSizeInputChange);
imageWidth.addEventListener('change', handleSizeInputChange);
window.addEventListener('load', setImageSizeInputs);
inputs.forEach(input => {
    input.addEventListener('focus', (e) => artwork.previousValue = e.target.value);
});

document.addEventListener('load', () => {
    if (resolution.value) {
        artwork.resolution = resolution.value
    }
});
artwork.image.onload = () => {
    draw(borderRange.value);
}

// DRAWING METHODS //

function calculateImageDesplaySize() {
    if (artwork.orientation == 'landscape') {
        artwork.longDimension = (canvas.width - 300)
        artwork.shortDimension = (canvas.width - 300) * artwork.imageAspectRatio
    } else {
        artwork.longDimension = (canvas.height - 150)
        artwork.shortDimension = (canvas.height - 150) * artwork.imageAspectRatio
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
    if (artwork.orientation == 'landscape') {
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
            Math.abs(canvas.width / 2 - artwork.shortDimension / 2),
            Math.abs(canvas.height / 2 - artwork.longDimension/2),
            artwork.shortDimension,
            artwork.longDimension,
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
    if (artwork.orientation == 'landscape') {
        context.rect(
            (canvas.width / 2 - artwork.longDimension / 2) - (Number(borderSize) / 2),
            (canvas.height / 2 - artwork.shortDimension / 2) - (Number(borderSize) / 2),
            artwork.longDimension + Number(borderSize),
            artwork.shortDimension + Number(borderSize),
            );
    } else {
        context.rect(
            (canvas.width / 2 - artwork.shortDimension / 2) - (Number(borderSize) / 2),
            (canvas.height / 2 - artwork.longDimension / 2) - (Number(borderSize) / 2),
            artwork.shortDimension + Number(borderSize),
            artwork.longDimension + Number(borderSize),
        );
        
    }
    context.fillStyle = '#fff';
    context.fill();
    context.shadowColor = 'transparent';
    loadImage();
  }


// Update the canvas when user changes the border size
function handleRangeUpdate(e) {
  draw(e.target.value);
}

// initialize the image size based on the image aspect ratio at 72dpi
function setImageSizeInputs() {
    if (!artwork.resolution) {
        artwork.resolution = 72;
        imageHeight.value = (artwork.image.naturalHeight / 72).toFixed(2)
        imageWidth.value = (artwork.image.naturalWidth / 72).toFixed(2)
    }
}

// When the user update one of the size inputs, automaticly update the other one to conform to the aspect ratio of the image
function handleSizeInputChange(e) { // TODO: change structure and handle Nan
    console.log('fire')
    const aspectRatio = artwork.imageAspectRatio
    const target = e.target.value
    if (artwork.orientation = 'landscape') {
        if (e.target == imageWidth) { // changing the width
            imageHeight.value = (target * aspectRatio).toFixed(2)
        } else { // changing the height
            imageWidth.value = (target / aspectRatio).toFixed(2);
        }
    } else { // the artwork orientation is portrait 
        if (e.target == imageWidth) { // changing the width
            imageHeight.value = (target * aspectRatio).toFixed(2);
        } else { // changing the height
            imageWidth.value = (target / aspectRatio).toFixed(2);
        }
        
    }
    changeResolution(target, artwork.previousValue);
    resolution.value = artwork.resolution;
    bubble.innerHTML = `${(borderRange.value / artwork.resolution).toFixed(2)}"`;
}


function changeResolution(currentValue, previousValue) {
    let factor = previousValue / currentValue; 
    artwork.resolution = artwork.resolution * factor;
}