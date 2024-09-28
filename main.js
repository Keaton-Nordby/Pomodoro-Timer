var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');

// Store a reference to a timer variable
var startTimer;
var isWorkTimer = true;  // Track whether we are in the work or break phase

start.addEventListener('click', function() {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running");
    }
});

reset.addEventListener('click', function() {
    wm.innerText = 25;
    ws.innerText = "00";

    bm.innerText = 5;
    bs.innerText = "00";

    document.getElementById('counter').innerText = 0;
    stopInterval();
    isWorkTimer = true;  // Reset to work phase
    startTimer = undefined;
});

stop.addEventListener('click', function() {
    stopInterval();
    startTimer = undefined;
});

// Timer function
function timer() {
    if (isWorkTimer) {
        // Work Timer Countdown
        let workMinutes = parseInt(wm.innerText);
        let workSeconds = parseInt(ws.innerText);

        if (workSeconds > 0) {
            workSeconds--;
            ws.innerText = workSeconds < 10 ? '0' + workSeconds : workSeconds; // Pad single digit seconds
        } else if (workMinutes > 0 && workSeconds === 0) {
            workMinutes--;
            wm.innerText = workMinutes < 10 ? '0' + workMinutes : workMinutes; // Pad single digit minutes
            workSeconds = 59;
            ws.innerText = workSeconds;
        } else if (workMinutes === 0 && workSeconds === 0) {
            // Switch to break timer
            isWorkTimer = false;
        }
    } 
    
    if (!isWorkTimer) {
        // Break Timer Countdown
        let breakMinutes = parseInt(bm.innerText);
        let breakSeconds = parseInt(bs.innerText);

        if (breakSeconds > 0) {
            breakSeconds--;
            bs.innerText = breakSeconds < 10 ? '0' + breakSeconds : breakSeconds;
        } else if (breakMinutes > 0 && breakSeconds === 0) {
            breakMinutes--;
            bm.innerText = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
            breakSeconds = 59;
            bs.innerText = breakSeconds;
        }

        // Increment Counter and reset the timers when both timers are done
        if (breakMinutes === 0 && breakSeconds === 0) {
            wm.innerText = 25;
            ws.innerText = "00";

            bm.innerText = 5;
            bs.innerText = "00";

            document.getElementById('counter').innerText++;
            isWorkTimer = true; // Reset to work phase after break
        }
    }
}

// Stop Timer function
function stopInterval() {
    clearInterval(startTimer);
}