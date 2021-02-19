const firePixelsArray = [];
var windChanged = false;
var debug = false;
const fireWidth = 100;
const fireHeight = 50;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];


function start() { 
  createFireDataStructure();
  createFireSource();
  renderFire();
  setInterval(calculateFirePropagation, 15);
}

function createFireDataStructure() { 
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0; 
  }
}

function toggleDebugger() { 
  debug = debug ? false : true;
}

function renderFire() { 
  let tableHtml = '<table cellpadding=0 cellspacing=0 >';

  for (let row = 0; row < fireHeight; row++) {
    tableHtml += '<tr>';
      for (let column = 0; column < fireWidth; column++) {
        
        const pixelIndex = column + (fireWidth * row);
        const firePixelIntensity = firePixelsArray[pixelIndex];

        const color = fireColorsPalette[firePixelIntensity];
        const colorString = `${color.r},${color.g},${color.b}`;

        if (debug) {
          tableHtml += `<td style="height: 7px; color:rgb(${colorString})">`;
          tableHtml += `<div class="pixel-index">${pixelIndex}</div>`;
          tableHtml += firePixelIntensity;
          tableHtml += '</td>';
        } else {
          tableHtml += `<td class="pixel" style="background-color: rgb(${colorString})">`;
          tableHtml += '</td>';
        }

        
      }
    tableHtml += '</tr>';
  }

  tableHtml += '</table>';

  document.querySelector('#fire-canvas').innerHTML = tableHtml;
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = (overflowPixelIndex - fireWidth) + column;

    firePixelsArray[pixelIndex] = 36;
  }
}

function changeWindDirection() {
  if(windChanged) {
    windChanged = false;
  } else {
    windChanged = true;
  }
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixel = currentPixelIndex + fireWidth;

  if (belowPixel >= fireWidth * fireHeight) {
    return;
  }

  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowPixel];
  const newFireIntensity 
  = belowPixelFireIntensity - decay >= 0 
    ? belowPixelFireIntensity - decay
    : 0
  windChanged
    ? firePixelsArray[currentPixelIndex - decay] = newFireIntensity
    : firePixelsArray[currentPixelIndex + decay] = newFireIntensity;
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + (fireWidth * row);
      updateFireIntensityPerPixel(pixelIndex);
    }
  }
  renderFire();
}

start();