import app from './app';
var canvas = document.getElementById("campground");
canvas.setAttribute("width", document.documentElement.clientWidth);
canvas.setAttribute("height", document.documentElement.clientHeight);
app(canvas);