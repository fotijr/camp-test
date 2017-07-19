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
        let pixelsToMove = 55;

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
        animateCamper(activeCamper);
        render(e.keyCode);
    }

    function animateCamper(camper) {
        window.clearTimeout(camper.animationComplete);
        camper.moving = true;
        camper.animationComplete = window.setTimeout(() => {
            camper.moving = false;
            render();
        }, 400);
    }

    function drawCamper(camper) {
        ctx.fillStyle = camper.color;
        ctx.fillRect(camper.x, camper.y + 5, camper.size, camper.size - 10);
        ctx.fillRect(camper.x + 5, camper.y, camper.size - 10, camper.size);

        ctx.fillStyle = "white";
        // draw eyes
        var eyes = {
            y: (camper.moving ? (camper.y + 19) : (camper.y + 20)),
            // height: (camper.moving ? (camper.size - 45) : (camper.size - 47))
            //y: (camper.y + 20),
            height: (camper.size - 47)
        };
        ctx.fillRect(camper.x + 10, eyes.y, camper.size - 40, eyes.height);
        ctx.fillRect(camper.x + 30, eyes.y, camper.size - 40, eyes.height);

        // draw mouth
        var mouth = {
            x: (camper.moving ? (camper.x + 19) : (camper.x + 18)),
            y: (camper.moving ? (camper.y + 32) : (camper.y + 35)),
            width: (camper.moving ? (camper.size - 39) : (camper.size - 36)),
            height: (camper.moving ? (camper.size - 39) : (camper.size - 45))
        };
        ctx.fillRect(mouth.x, mouth.y, mouth.width, mouth.height);
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

    function render(keyCode) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCampground();

        var buffer = 25;
        var boundaryCrossed = activities.some(function (activity, index) {
            if (((activeCamper.boundaries.top) < (activity.boundaries.bottom + buffer)) &&
                ((activeCamper.boundaries.left) < (activity.boundaries.right + buffer)) &&
                ((activeCamper.boundaries.bottom) > (activity.boundaries.top - buffer)) &&
                ((activeCamper.boundaries.right) > (activity.boundaries.left - buffer))) {
                if (activeActivity !== activity) {
                    activeActivity = activity;
                    showPrompt("Press [x] to " + activeActivity.action);
                }
                preventCamperFromPassingActivityBuffer(activeCamper, activity, keyCode);
                return true;
            }
        });
        keepCamperOnGrounds(activeCamper);
        drawCamper(activeCamper);
        if (!boundaryCrossed && promptShown) {
            hideCamperPrompt(activeCamper);
        }
    }

    // keep camper on edge of activity
    function preventCamperFromPassingActivityBuffer(camper, activity, keyCode) {
        var minBuffer = 5,
            axis, adjustment;

        var insideBoundary = (((camper.boundaries.top) < (activity.boundaries.bottom + 0)) &&
            ((camper.boundaries.left) < (activity.boundaries.right + 0)) &&
            ((camper.boundaries.bottom) > (activity.boundaries.top - 0)) &&
            ((camper.boundaries.right) > (activity.boundaries.left - 0)));

        // if camper not inside activity boundaries, then they're just in buffer zone which is OK
        if (!insideBoundary) return;

        if (keyCode === 38) { // up
            axis = "y";
            adjustment = (activity.boundaries.bottom - camper.boundaries.top + minBuffer);
        } else if (keyCode === 39) { // right
            axis = "x";
            adjustment = (camper.boundaries.right - activity.boundaries.left + minBuffer) * -1;
        } else if (keyCode === 40) { // down
            axis = "y";
            adjustment = (camper.boundaries.bottom - activity.boundaries.top + minBuffer) * -1;
        } else if (keyCode === 37) { // left
            axis = "x";
            adjustment = (activity.boundaries.right - camper.boundaries.left + minBuffer);
        } else {
            return;
        }
        camper[axis] += adjustment;
    }

    function keepCamperOnGrounds(camper) {
        var camperBounds = camper.boundaries;
        if (camperBounds.left < 0) {
            camper.x = 0;
        } else if (camperBounds.top < 0) {
            camper.y = 0;
        } else {
            var canvasBounds = canvas.getBoundingClientRect();
            if (camperBounds.bottom > canvasBounds.bottom) {
                camper.y = (canvasBounds.bottom - camper.size);
            } else if (camperBounds.right > canvasBounds.right) {
                camper.x = (canvasBounds.right - camper.size);
            }
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
        var patchWidth = 15;
        var patchSize = 10;
        var grassPatches = { color: "#285813", blobs: [] };
        for (let i = 0; i < 40; i++) {
            let xFactor = Math.random(),
                yFactor = Math.random(),
                x = (canvas.width * xFactor),
                y = (canvas.height * yFactor);
            grassPatches.blobs.push({
                x,
                y,
                width: patchWidth,
                height: patchSize - 5
            });
            grassPatches.blobs.push({
                x,
                y: y - 5,
                width: 3,
                height: patchSize
            });
            grassPatches.blobs.push({
                x: x + 7,
                y: y - 5,
                width: 3,
                height: patchSize
            });
            grassPatches.blobs.push({
                x: x + patchWidth,
                y: y - 5,
                width: 3,
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