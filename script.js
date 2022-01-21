var display;
var timer;

var lp1, lp2;
var interval;

var displayed = 0;
var marker = 0;

var time = new Date(40 * 1000 * 60);

var lpLog = [];

function addButtonListener() {
  var base = "b";
  for (let i = 0; i < 10; i++) {
    document
      .getElementById(base + i.toString())
      .addEventListener("click", function () {
        handleNumber(i);
      });
  }

  document.getElementById("delete").addEventListener("click", function () {
    displayed = 0;
    marker = 0;
    display.textContent = "00";
  });

  document.getElementById("reset").addEventListener("click", function () {
    lpReset();
    lpLog.push([null, 0]);
  });

  document.getElementById("undo").addEventListener("click", function () {
    if (lpLog.length) {
      let action = lpLog.pop();

      if (action[0]) {
        target = action[0];
        value = action[1];
        curr = parseInt(target.textContent);

        target.textContent = curr - value;
      } else {
        lpReset();
      }
    }
  });

  document.getElementById("plus1").addEventListener("click", function () {
    let value = parseInt(lp1.textContent);
    lpCalc(value, displayed, lp1);
  });

  document.getElementById("minus1").addEventListener("click", function () {
    let value = parseInt(lp1.textContent);
    lpCalc(value, -displayed, lp1);
  });

  document.getElementById("plus2").addEventListener("click", function () {
    let value = parseInt(lp2.textContent);
    lpCalc(value, displayed, lp2);
  });

  document.getElementById("minus2").addEventListener("click", function () {
    let value = parseInt(lp2.textContent);
    lpCalc(value, -displayed, lp2);
  });

  document.getElementById("timer").addEventListener("click", function () {
    time = Date.now() + 40 * 60 * 1000;
    timer.textContent = "39:59";
    interval = setInterval(function () {
      var distance = new Date(time - Date.now());
      if (distance <= 1 * 1000) {
        clearInterval(interval);
        timer.textContent = "0:00";
        return;
      }
      timer.textContent =
        distance.getMinutes() +
        ":" +
        String(distance.getSeconds()).padEnd(2, "0");
    }, 1000);
  });
  document.getElementById("timer-reset").addEventListener("click", function () {
    // // time = new Date(40 * 1000 * 60);
    // timer.textContent =
    //   time.getMinutes() + ":" + String(time.getSeconds()).padEnd(2, "0");
    clearInterval(interval);
    timer.textContent = "Time";
  });
}

function handleNumber(number) {
  if (marker == 0) {
    if (number == 0) {
      marker = 2;
    } else {
      displayed = number * 100;
      marker = 1;
    }
  } else if (marker == 1) {
    displayed *= 10;
    displayed += number * 100;
    marker = 2;
  } else if (marker == 2) {
    if (number == 0) {
      displayed *= 10;
      marker = 4;
    } else {
      displayed += number * 10;
      marker = 3;
    }
  } else if (marker == 3) {
    if (number == 0) {
      displayed *= 10;
      marker = 4;
    } else {
      displayed += number;
      marker++;
    }
  } else {
    displayed *= 10;
    displayed += number;
  }

  display.textContent = displayed;
}

window.onload = function () {
  display = document.getElementById("display");
  timer = document.getElementById("timer");
  //   timer.textContent =
  //     time.getMinutes() + ":" + String(time.getSeconds()).padEnd(2, "0");
  lp1 = document.getElementById("lp1-value");
  lp2 = document.getElementById("lp2-value");
  addButtonListener();

  registerServiceWorker();
};

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    let registration;

    const registerServiceWorker2 = async () => {
      registration = await navigator.serviceWorker.register(
        "./service-worker.js"
      );
    };
    registerServiceWorker2();
  }
}

function lpCalc(curr, diff, target) {
  if (diff != 0) {
    let value = curr;
    value += diff;
    lpLog.push([target, diff]);
    target.textContent = value.toString();
    displayed = 0;
    marker = 0;
    display.textContent = "00";
  }
}

function lpReset() {
  lp1.textContent = "8000";
  lp2.textContent = "8000";

  displayed = 0;
  marker = 0;
  display.textContent = "00";
}
