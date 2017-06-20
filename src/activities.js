
/**
 * Generate a result object
 * 
 * @param {bool} success 
 * @param {string} msg 
 * @returns 
 */
function generateResult(success, msg) {
    return {
        success: success,
        message: msg
    };
}

export default function () {
    var zipline = {
        img: "zipline.jpg",
        imgElement: null,
        title: "Zipline",
        x: 35,
        y: 60,
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.width,
                bottom: this.y + this.height,
                left: this.x
            };
        },
        width: 100,
        height: 71,
        action: "ride the zipline",
        do: function (person) {
            if (person.age < 16 && !person.waivers.zipline) {
                return generateResult(false, "I'm sorry, you are not old enough to ride the zipline without a waiver ☹");
            }
            return generateResult(true, "🎈 You enjoyed the zipline! 🎈");
        }
    };

    return {
        zipline,
        all: [zipline]
    };
}