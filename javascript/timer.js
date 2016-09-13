var callTime = 0;
var g = 0;
var h = 0;
var i = 0;
function timedCount() {
    if (i < 59) {
        i = i + 1;
    } else {
        if (h < 59) {
            i = 0;
            h = h + 1;
        } else {
            i = 0;
            h = 0;
            g = g + 1;
        }
    }

    if (g <= 9) {
        var A = "0" + g;
    } else {
        var A = g;
    }
    if (h <= 9) {
        var B = "0" + h;
    } else {
        var B = h;
    }
    if (i <= 9) {
        var C = "0" + i;
    } else {
        C = i;
    }
    callTime = callTime + 1;
    postMessage(A + ':' + B + ':' + C);
    setTimeout("timedCount()", 1000);
}
timedCount()
;