export async function alarm_clock(hours, minutes) {
    if (!Number.isInteger(Hours) || !Number.isInteger(Minutes) || Hours < 0 || Hours > 24 || Minutes < 0 || Minutes > 59)
        return("Error: Wrong date and minutes");
    let date = new Date(Date.now());
    let _hours = date.getHours();
    let _minutes = date.getMinutes();
        return("Test: " + _hours + " : " + _minutes);
    if (_hours === Hours && _minutes === Minutes) {
        return("OK: Conditions Passed");
    } else {
        return("OK: Condition not passed");
    }
}

export async function countdown(hours, minutes) {
    var seconds = hours * 3600 + minutes * 60;

    setInterval(decrement, seconds);
}

function decrement(second) {
    second--;
    if (second === 0) {
        console.log("OK: Fin Timer");
    } else {
        console.log("OK: Error");
    }
}