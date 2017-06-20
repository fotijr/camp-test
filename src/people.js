const camperSize = 50;

export default function (x, y) {
    var nia = {
        name: "Nia",
        color: "#774938",
        age: 14,
        waivers: {
            //zipline: true
        },
        x: x ? (x - (camperSize / 2)) : 0,
        y: y ? (y - (camperSize / 2)) : 0,
        size: camperSize,
        promtShown: false,
        get boundaries() {
            return {
                top: this.y,
                right: this.x + this.size,
                bottom: this.y + this.size,
                left: this.x
            };
        }
    };

    return {
        nia,
        all: [nia]
    };
}