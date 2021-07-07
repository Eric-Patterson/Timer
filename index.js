class Timer{
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        // eventlistener to start button || this.startButton is what determins the button.
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () =>{
        if(this.onStart){
            this.onStart();
        }
        // manually runs one tick, then after runs a tick every one interval
        this.tick();
        // run this.tick interval every 1 second after start is pressed
        this.interval = setInterval(this.tick, 1000);
    };

    pause = () =>{
        // to have access from the timer variable above, we give it this.timer
        // otherwise we would not have access to it in the pause function
        clearInterval(this.interval);
    };

    tick = () =>{
        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        } else{
        // we are calling the getter to retrieve the value in the this.timeRemaining -1;
        // then we call the setter in the this.timeRemaining to whenever we want to set the value
        this.timeRemaining = this.timeRemaining - 1;
        if(this.onTick){
            this.onTick();
        }
        }
        // parseFloat = converts string to number
        // const timeRemaining = parseFloat(this.durationInput.value);
        // this.durationInput.value = timeRemaining - 1;
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining (time) {
        this.durationInput.value = time;
    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(){
        console.log('Timer started');
    },
    onTick(){
        console.log('Timer ticked down');
    },
    onComplete(){
        console.log('Timer completed');
    }
});