class Artwork {
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
        this.imageHeight = this.image.height;
        this.imageWidth = this.image.width;
        this.imageLongDimension = this.image.width >= this.image.height ? this.image.width : this.image.height;
        this.imageShortDimension = this.image.width < this.image.height ? this.image.width : this.image.height;
        this.imageAspectRatio = this.image.width > this.image.height ? this.image.width / this.image.height : this.image.height / this.image.width;
        this.orientation = this.image.width >= this.image.height ? 'landscape' : 'portrait'
        this.previousValue = null;
        this.resolution = null;
        this.border = null;
        this.frameMolding = null;
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
const frameMolding = Number(document.querySelector('#frameMolding').innerHTML);
const borders = Number(document.querySelector('#borders').innerHTML) || 0;


// EVENT HANDELERS //
// window.addEventListener('load', draw(borderRange.value));
artwork.image.onload = () => {
    const frameMoldingInPixels = frameMolding * artwork.resolution
    console.log(borders, frameMoldingInPixels, artwork.resolution)
    draw(Number(borders, frameMoldingInPixels));
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
function draw(borderSize, frameMolding) {
    console.log(borderSize, frameMolding)
    borderSize = Number(borderSize)
    frameMolding = Number(frameMolding)
    calculateImageDesplaySize()
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Shadow parameters
    dropShadow();
    context.lineWidth = frameMolding;    
    context.fillStyle = '#fff';
    // context.beginPath();
    if (artwork.orientation == 'landscape') {
        context.fillRect(
            (canvas.width / 2 - artwork.longDimension / 2) - (borderSize / 2),
            (canvas.height / 2 - artwork.shortDimension / 2) - (borderSize / 2),
            artwork.longDimension + borderSize,
            artwork.shortDimension + borderSize,
        );

        if (frameMolding) {
            context.strokeRect(
                (canvas.width / 2 - artwork.longDimension / 2) - (borderSize / 2) - (frameMolding / 2),
                (canvas.height / 2 - artwork.shortDimension / 2) - (borderSize / 2) - (frameMolding / 2),
                artwork.longDimension + borderSize + frameMolding,
                artwork.shortDimension + borderSize + frameMolding,
            );
        }
        
    } else {
        context.fillRect(
            (canvas.width / 2 - artwork.shortDimension / 2) - (Number(borderSize) / 2),
            (canvas.height / 2 - artwork.longDimension / 2) - (Number(borderSize) / 2),
            artwork.shortDimension + Number(borderSize),
            artwork.longDimension + Number(borderSize),
        );
        
        if (frameMolding) {
            context.strokeRect(
                (canvas.width / 2 - artwork.shortDimension / 2) - (Number(borderSize) / 2),
                (canvas.height / 2 - artwork.longDimension / 2) - (Number(borderSize) / 2),
                artwork.shortDimension + Number(borderSize),
                artwork.longDimension + Number(borderSize),
            );
        }
    }

    // context.fillStyle = '#fff';
    // context.fill();
    context.shadowColor = 'transparent';
    loadImage();
  }