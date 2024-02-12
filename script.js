let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    //clear any existing timer
    clearInterval(countdown)
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    //To update the timer ever second
    countdown = setInterval(() => {
        const secondsleft = Math.round((then - Date.now()) / 1000);
        //check if we should stop
        if (secondsleft < 0) {
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsleft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${mins}:${remainderSeconds < 10 ? "0" : ""
        }${remainderSeconds}`;

    document.title = display;

    timerDisplay.textContent = display;
    console.log(display);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? "0" : ""
        }${minutes} ${hours > 12 ? "pm" : "am"}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

//Directly selecting the form
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes*60);
    this.reset();
})
