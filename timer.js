class Timer{
    constructor(durationInput, startButton, pauseButton, refreshButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.refreshButton = refreshButton;
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        // eventlistener to start button || this.startButton is what determins the button.
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.refreshButton.addEventListener('click', this.refresh);
    }

    start = () =>{
        if(this.onStart){
            this.onStart(this.timeRemaining);
            this.startButton.disabled = true;
        }
        
        // manually runs one tick, then after runs a tick every one interval
        this.tick();
        // run this.tick interval every 1 second after start is pressed

        // smoothing tick animation, with (this.tick, 1000) its very blocky
        this.interval = setInterval(this.tick, 20);
        
    };

    pause = () =>{
        // to have access from the timer variable above, we give it this.timer
        // otherwise we would not have access to it in the pause function
        clearInterval(this.interval);
         this.startButton.disabled = false;
    };

    refresh = () =>{
        location.reload()
        // document.querySelector("#refresh").addEventListener("click", function() {
        //     let element = document.querySelector("#dial");
        //     let cloneElement = element.cloneNode(true);
        //     element.parentNode.replaceChild(cloneElement, element); 
        //  }, false);

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

        // instead of having it this.timeRemaining - 1, since we updated tick interval to be every 50 milsec we reduce this down as well
        // otherwise it ticks too fast
        this.timeRemaining = this.timeRemaining - 0.02;
        if(this.onTick){
            this.onTick(this.timeRemaining);
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
        this.durationInput.value = time.toFixed(2); //this will round the decimal to 2 decimal places
    }
}