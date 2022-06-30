TARGET_TIME = "18:00";
DOTS = 3

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
TARGET_TIME_PARAM = urlParams.get("target_time");
if (TARGET_TIME_PARAM) {
  TARGET_TIME = TARGET_TIME_PARAM;
}

//time between now and timm
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / 1000 / 60 / 60) % 60);
  var minutesPlusHours = minutes + hours * 60;
  if (minutesPlusHours < 0) {
    if (DOTS === 3) {
      DOTS = 0
    }

    DOTS += 1

    return "Loading" + ".".repeat(DOTS) + " ".repeat(3 - DOTS);
  }


  return [
    padNumberWithZero(minutesPlusHours),
    padNumberWithZero(seconds),
  ].join(":");
}

// set div text to time remaining
function updateClock() {
  var t = getTimeRemaining(setTime(TARGET_TIME));
  document.getElementById("timer").innerHTML = t;
}

// set minutes and hours on date object
function setTime(time) {
  var d = new Date();
  minutes = time.split(":")[1];
  hours = time.split(":")[0];
  d.setMinutes(minutes);
  d.setHours(hours);
  d.setSeconds(0);
  return d;
}

function padNumberWithZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

setInterval(updateClock, 1000);