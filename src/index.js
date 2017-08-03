import app from './app';
var canvas = document.getElementById("campground");
canvas.setAttribute("width", document.documentElement.clientWidth);
canvas.setAttribute("height", document.documentElement.clientHeight);

var instance = app(canvas);
window.addEventListener("resize", () => {
    canvas.setAttribute("width", document.documentElement.clientWidth);
    canvas.setAttribute("height", document.documentElement.clientHeight);
    instance.generateMap();
    instance.render();
});