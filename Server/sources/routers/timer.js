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

export async function countdown_loop(hours, minutes) {
    var seconds = hours * 3600 + minutes * 60;

    for (let i = 0; i < 1000; i++) {
        setInterval(await (seconds = countdown(seconds)), 1000);
    }
}

export async function countdown(seconds) {
    setInterval((seconds = decrement(seconds)), 1000);
    if (seconds === 0) {
        return("ok: fin timer");
    } else {
        return (--seconds);
    }
}

function decrement(second) {
    if (second === 0) {
        return ("OK: Fin Timer");
    } else {
        return (--second);
    }
}