import app from './app';

function component () {
  var element = document.createElement('h1');
  element.innerHTML = "Camp Test";
  return element;
}

document.body.appendChild(component());

function campground () {
  var element = document.createElement('canvas');
  element.setAttribute("width", "500");
  element.setAttribute("height", "500");
  return element;
}

var canvas = document.body.appendChild(campground());
app(canvas);