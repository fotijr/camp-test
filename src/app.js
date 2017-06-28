import Activities from './activities';
import People from './people';

export default function (canvas) {
    const ctx = canvas.getContext('2d');

    var activities = Activities().all;
    var activityIndex = -1;

    var campers = People((canvas.width / 2), (canvas.height / 2)).all;
    var camperIndex = 0;

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

    function drawCamper(camper) {
        // console.log("Drawing camper", camper.x, camper.y);
        ctx.fillStyle = camper.color;
        ctx.fillRect(camper.x, camper.y + 5, camper.size, camper.size - 10);
        ctx.fillRect(camper.x + 5, camper.y, camper.size - 10, camper.size);

        // draw eyes
        ctx.fillStyle = "white";
        ctx.fillRect(camper.x + 10, camper.y + 20, camper.size - 40, camper.size - 47);
        ctx.fillRect(camper.x + 30, camper.y + 20, camper.size - 40, camper.size - 47);
        ctx.fillRect(camper.x + 17, camper.y + 35, camper.size - 36, camper.size - 48);
    }

    function showCamperPrompt(person, activity) {
        var prompt = getPromptElement();
        if (prompt === null) return;
        var canvasBorder = canvas.getBoundingClientRect();
        prompt.innerHTML = "Press [x] to " + activity.action;
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

        let camper = campers[camperIndex];
        let buffer = 15;

        drawCamper(camper);
        var boundaryCrossed = activities.some(function (activity, index) {
            if (((camper.boundaries.top) < (activity.boundaries.bottom + buffer)) &&
                ((camper.boundaries.left) < (activity.boundaries.right + buffer)) &&
                ((camper.boundaries.bottom) > (activity.boundaries.top - buffer)) &&
                ((camper.boundaries.right) > (activity.boundaries.left - buffer))) {
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

    function renderActivity(activity) {
        var activityDiv = document.createElement('div');
        activityDiv.innerHTML = activity.title;
        activityDiv.classList.add("activity");
        activityDiv.style.backgroundImage = "url('/img/" + activity.img + "')";
        activityDiv.style.width = activity.width + "px";
        activityDiv.style.height = activity.height + "px";
        activityDiv.style.top = activity.y + "px";
        activityDiv.style.left = activity.x + "px";
        document.body.appendChild(activityDiv);
    }

    activities.forEach(renderActivity);
    window.addEventListener("keydown", keydown);
    render();
}