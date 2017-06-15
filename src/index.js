import app from './app';

function title() {
  var element = document.createElement('h1');
  element.innerHTML = "Camp Test";
  return element;
}

function campground() {
  var element = document.createElement('canvas');
  element.setAttribute("width", document.documentElement.clientWidth);
  element.setAttribute("height", document.documentElement.clientHeight);
  return element;
}

function prompt(){
  var element = document.createElement('div');
  element.classList.add("prompt");
  return element;
}

//document.body.appendChild(title());
var canvas = document.body.appendChild(campground());
document.body.appendChild(prompt());
app(canvas);