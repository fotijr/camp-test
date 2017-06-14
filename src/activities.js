export default function () {
    var zipline = {
        img: "zipline.jpg",
        imgElement: null,
        title: "Zipline",
        x: 35,
        y: 60,
        width: 100,
        height: 71,
        action: "ride the zipline",
        do: function(){
            return {
                success: true,
                message: "You enjoyed the zipline!"
            };
        }
    };

    return [
        zipline
    ];
}