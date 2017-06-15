import Activities from './activities';
import People from './people';

export default function (canvas) {
    const ctx = canvas.getContext('2d');

    var activities = Activities().all;
    var activityIndex = -1;

    var campers = People((canvas.width / 2), (canvas.height / 2)).all;
    var camperIndex = 0;

    function initializeActivityImage(activity) {
        var img = document.createElement('img');
        img.setAttribute("src", "/img/" + activity.img);
        img.setAttribute("class", "preloaded");
        img.setAttribute("width", activity.width);
        activity.imgElement = document.body.appendChild(img);
    }

    function keydown(e) {
        let pixelsToMove = 25;
        let camper = campers[camperIndex];

        if (e.keyCode === 88 && activityIndex >= 0) { // x
            return doActivity(activities[activityIndex], camper);
        }

        if (e.keyCode === 38) { // up
            camper.y -= pixelsToMove;
        } else if (e.keyCode === 39) { // right
            camper.x += pixelsToMove;
        } else if (e.keyCode === 40) { // down
            camper.y += pixelsToMove;
        } else if (e.keyCode === 37) { // left
            camper.x -= pixelsToMove;
        } else {
            console.log("Key code:", e.keyCode);
            return;
        }
        render();
    }

    function drawActivity(activity) {
        ctx.drawImage(activity.imgElement, activity.x, activity.y, activity.width, activity.height);
    }

    function drawCamper(camper) {
        console.log("Drawing camper", camper.x, camper.y);
        ctx.fillStyle = camper.color;
        ctx.fillRect(camper.x, camper.y, camper.size, camper.size);
    }

    function showCamperPrompt(person, activity) {
        var prompt = getPromptElement();
        if (prompt === null) return;
        var canvasBorder = canvas.getBoundingClientRect();
        prompt.innerHTML = "Press [x] to " + activity.action;
        var promptBoundary = prompt.getBoundingClientRect();
        console.log("promptbound", promptBoundary);
        prompt.style.top = (canvasBorder.top + person.boundaries.bottom + 10) + "px";
        prompt.style.left = (canvasBorder.left + person.x - (promptBoundary.width / 2)) + "px";

        prompt.classList.add("show");
        person.promtShown = true;
    }

    function getPromptElement() {
        var prompt = document.getElementsByClassName("prompt");
        if (prompt.length === 0) return null;
        return prompt[0];
    }

    function hideCamperPrompt(person) {
        activityIndex = -1;
        var prompt = getPromptElement();
        if (prompt === null) return;
        prompt.classList.remove("show", "happy", "sad");
        person.promtShown = false;
    }

    function doActivity(activity, camper) {
        var result = activity.do(camper);
        console.log(result);

        var prompt = getPromptElement();
        if (prompt === null) return;
        prompt.innerHTML = result.message;
        var css = result.success ? "happy" : "sad";
        prompt.classList.add(css);
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        activities.forEach(drawActivity);

        let camper = campers[camperIndex];
        let buffer = 15;

        drawCamper(camper);
        var boundaryCrossed = activities.some(function (activity, index) {
            if ((camper.boundaries.top) < (activity.boundaries.bottom + buffer)) {
                if (!camper.promtShown) {
                    activityIndex = index;
                    showCamperPrompt(camper, activity);
                }
                return true;
            }
        });
        if (!boundaryCrossed && camper.promtShown) {
            hideCamperPrompt(camper);
        }
    }

    activities.forEach((activity) => {
        initializeActivityImage(activity);
    });

    setTimeout(() => {
        window.addEventListener("keydown", keydown);
        render();
    }, 200);
}