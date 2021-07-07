const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const refreshButton = document.querySelector('#refresh');

const circle = document.querySelector('circle');

// find the perim of the circle
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, refreshButton,  {
    onStart(totalDuration){
        // console.log('Timer started');
        duration = totalDuration;
        
    },
    onTick(timeRemaining){
        // console.log('Timer ticked down');
        // circle.setAttribute('stroke-dashoffset', currentOffset)
        // currentOffset -= 1;
        circle.setAttribute('stroke-dashoffset', 
        perimeter * timeRemaining / duration - perimeter
        );
        
    },
    onComplete(){
        // console.log('Timer completed');
    }
});