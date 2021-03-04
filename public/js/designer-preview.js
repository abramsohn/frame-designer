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


// EVENT HANDELERS //
window.addEventListener('load', () => {
    // if (resolution.value) { artwork.resolution = Number(resolution.value) };
    // if (frameMolding.value) { artwork.frameMolding = Number(frameMolding.value) };
    // if (borderRange.value) { artwork.border = Number(borderRange.value) };
    // setImageSizeInputs();
    draw(artwork.image, borderRange.value ,artwork.frameMolding * artwork.resolution);
});

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
function loadImage(image) {
    if (artwork.orientation == 'landscape') {
        context.drawImage(
            image,
            Math.abs(canvas.width / 2 - artwork.longDimension/2),
            Math.abs(canvas.height / 2 - artwork.shortDimension / 2),
            artwork.longDimension,
            artwork.shortDimension
        );
    } else {  
        context.drawImage(
            image,
            Math.abs(canvas.width / 2 - artwork.shortDimension / 2),
            Math.abs(canvas.height / 2 - artwork.longDimension/2),
            artwork.shortDimension,
            artwork.longDimension,
        );
    }
}


function draw(image, borderSize, frameMolding) {
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
    context.shadowColor = 'transparent';
    loadImage(image);
  }

function calculateFramePixelsSize(inchesSize) {
    return inchesSize * artwork.resolution
}