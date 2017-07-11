import Activities from './activities';
import People from './people';

export default function (canvas) {
    const ctx = canvas.getContext('2d');
    var promptShown = false;
    var canvasArtifacts = [];

    var activities = Activities().all;
    var activeActivity;

    var campers = People((canvas.width / 2), (canvas.height / 2)).all;
    var activeCamper = campers[0];

    function keydown(e) {
        let pixelsToMove = 25;

        if (e.keyCode === 88 && activeActivity) { // x
            return doActivity(activeActivity, activeCamper);
        }

        if (e.keyCode === 38) { // up
            activeCamper.y -= pixelsToMove;
        } else if (e.keyCode === 39) { // right
            activeCamper.x += pixelsToMove;
        } else if (e.keyCode === 40) { // down
            activeCamper.y += pixelsToMove;
        } else if (e.keyCode === 37) { // left
            activeCamper.x -= pixelsToMove;
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

    function showPrompt(message) {
        var prompt = getPromptElement();
        if (prompt === null) return;
        prompt.innerHTML = message;
        prompt.classList.add("show");
        promptShown = true;
    }

    function getPromptElement() {
        var prompt = document.getElementsByClassName("prompt");
        if (prompt.length === 0) return null;
        return prompt[0];
    }

    function hideCamperPrompt(person) {
        activeActivity = null;
        var prompt = getPromptElement();
        if (prompt === null) return;
        prompt.classList.remove("show", "happy", "sad");
        promptShown = false;
    }

    function doActivity(activity, camper) {
        activity.do(camper)
            .then(msg => {
                return { success: true, message: msg };
            })
            .catch(msg => {
                return { success: false, message: msg };
            })
            .then(result => {
                var prompt = getPromptElement();
                if (prompt === null) return;
                var css = result.success ? "happy" : "sad";
                prompt.classList.add(css);
                prompt.innerHTML = result.message;
            });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCampground();

        var buffer = 15;
        drawCamper(activeCamper);
        var boundaryCrossed = activities.some(function (activity, index) {
            if (((activeCamper.boundaries.top) < (activity.boundaries.bottom + buffer)) &&
                ((activeCamper.boundaries.left) < (activity.boundaries.right + buffer)) &&
                ((activeCamper.boundaries.bottom) > (activity.boundaries.top - buffer)) &&
                ((activeCamper.boundaries.right) > (activity.boundaries.left - buffer))) {
                if (activeActivity !== activity) {
                    activeActivity = activity;
                    showPrompt("Press [x] to " + activeActivity.action);
                }
                return true;
            }
        });
        if (!boundaryCrossed && promptShown) {
            hideCamperPrompt(activeCamper);
        }
    }

    function drawCampground() {
        canvasArtifacts.forEach(function (colorGroup) {
            ctx.fillStyle = colorGroup.color;
            colorGroup.blobs.forEach(function (blob) {
                ctx.fillRect(blob.x, blob.y, blob.width, blob.height);
            });
        });
    }

    function generateMap() {
        // bland green grass background
        canvasArtifacts.push({
            color: "#71CE48",
            blobs: [{
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height
            }]
        });

        // darker green grass patches
        var patchSize = 5;
        var grassPatches = { color: "#285813", blobs: [] };
        for (let i = 0; i < 200; i++) {
            let xFactor = Math.random(),
                yFactor = Math.random(),
                x = (canvas.width * xFactor),
                y = (canvas.height * yFactor);
            grassPatches.blobs.push({
                x,
                y,
                width: patchSize,
                height: patchSize
            });
        }
        canvasArtifacts.push(grassPatches);
    }


    function renderActivity(activity) {
        var activityDiv = document.createElement('div');
        activityDiv.innerHTML = activity.title;
        activityDiv.classList.add("activity");
        if (activity.style) {
            let cssText = "";
            Object.entries(activity.style).forEach(
                ([cssProp, value]) => cssText += cssProp + ":" + value + ";"
            );
            activityDiv.style.cssText = cssText;
        }
        document.body.appendChild(activityDiv);
        var rect = activityDiv.getBoundingClientRect();
        activity.x = rect.left;
        activity.y = rect.top;
    }

    activities.forEach(renderActivity);
    window.addEventListener("keydown", keydown);
    generateMap();
    render();
    showPrompt("Welcome to Camp Test! Use the arrow keys to move.");
}