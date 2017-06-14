import Activities from './activities';

export default function (canvas) {
    const ctx = canvas.getContext('2d');
    const camperSize = 10;

    var activities = Activities();

    var camper = {
        x: (canvas.width / 2) - (camperSize / 2),
        y: (canvas.height / 2) - (camperSize / 2),
        size: camperSize
    };

    function initializeActivityImage(activity) {
        var img = document.createElement('img');
        img.setAttribute("src", "/img/" + activity.img);
        img.setAttribute("class", "preloaded");
        img.setAttribute("width", activity.width);
        activity.imgElement = document.body.appendChild(img);
    }

    function drawText(txt) {
        ctx.font = '124px serif';
        ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
    }

    function keydown(e) {
        let pixelsToMove = 25;
        // up
        if (e.keyCode === 38) {
            camper.y -= pixelsToMove;
        }
        // right
        if (e.keyCode === 39) {
            camper.x += pixelsToMove;
        }
        // down
        if (e.keyCode === 40) {
            camper.y += pixelsToMove;
        }
        // left
        if (e.keyCode === 37) {
            camper.x -= pixelsToMove;
        }
        render();
    }

    function drawActivity(activity) {
        ctx.drawImage(activity.imgElement, activity.x, activity.y, activity.width, activity.height);
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        activities.forEach(function (activity) {
            drawActivity(activity);
        });

        ctx.fillStyle = 'brown';
        ctx.fillRect(camper.x, camper.y, camper.size, camper.size);
    }

    activities.forEach(function (activity) {
        initializeActivityImage(activity);
    });

    setTimeout(() => {
        window.addEventListener("keydown", keydown);
        render();
    }, 200);
}