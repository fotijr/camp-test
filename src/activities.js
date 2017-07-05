export default function () {
    var zipline = {
        title: "Zipline",
        x: 0,
        y: 0,
        style: {
            top: "10%",
            left: "10%",
            width: 300,
            height: 213,
            "background-image": "url(/img/zipline.jpg)"
        },
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.style.width,
                bottom: this.y + this.style.height,
                left: this.x
            };
        },
        action: "ride the zipline",
        do: function (person) {
            return new Promise((resolve, reject) => {
                if (person.age < 16 && !person.waivers.zipline) {
                    reject("I'm sorry, you are not old enough to ride the zipline without a waiver ☹");
                }
                resolve("🎈 You enjoyed the zipline! 🎈");
            });
        }
    };

    var pool = {
        title: "Pool",
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.style.width,
                bottom: this.y + this.style.height,
                left: this.x
            };
        },
        x: 0,
        y: 0,
        style: {
            top: "10%",
            right: "10%",
            width: 300,
            height: 213,
            "background-image": "url(/img/pool.jpg)"
        },
        action: "swim in the pool",
        do: function (person) {
            return new Promise((resolve, reject) => {
                var now = new Date().getHours(),
                    open = 7,
                    close = 19;
                if (now < open || now >= close) {
                    reject("I'm sorry, the pool is only open between 7am-7pm ☹");
                }
                resolve("🎈 You swam in the pool! 🎈");
            });
        }
    };

     var computerLab = {
        title: "Computer Lab",
        x: 0,
        y: 0,
        style: {
            bottom: "10%",
            left: "10%",
            width: 300,
            height: 213,
            "background-image": "url(/img/computer.jpg)"
        },
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.style.width,
                bottom: this.y + this.style.height,
                left: this.x
            };
        },
        action: "to check your email",
        do: function (person) {
            return new Promise((resolve, reject) => {
                person.waivers.zipline = true;
                resolve("🎈 Your parents emailed a zipline waiver! 🎈");
            });
        }
    };

    return {
        zipline,
        pool,
        computerLab,
        all: [zipline, pool, computerLab]
    };
}