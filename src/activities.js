
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
        width: 300,
        height: 213,
        action: "ride the zipline",
        do: function (person) {
            if (person.age < 16 && !person.waivers.zipline) {
                return generateResult(false, "I'm sorry, you are not old enough to ride the zipline without a waiver ☹");
            }
            return generateResult(true, "🎈 You enjoyed the zipline! 🎈");
        }
    };

     var pool = {
        img: "pool.jpg",
        title: "Pool",
        x: 850,
        y: 200,
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.width,
                bottom: this.y + this.height,
                left: this.x
            };
        },
        width: 300,
        height: 213,
        action: "swim in the pool",
        do: function (person) {
            var now = new Date().getHours(),
                open = 7,
                close = 19;
            if (now < open || now >= close) {
                return generateResult(false, "I'm sorry, the pool is only open between 7am-7pm ☹");
            }
            return generateResult(true, "🎈 You swam in the pool! 🎈");
        }
    };

    return {
        zipline,
        pool,
        all: [zipline, pool]
    };
}