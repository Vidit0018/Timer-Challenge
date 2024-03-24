import { useState,useRef } from "react";
import ResultModal from "./ResultModal";
export default function TimerChallenge({title,targetTime}) {
    const timer =useRef();
    const dialog =useRef();

    const [timeRemaining , setTimeRemaining ] = useState(targetTime*1000);
    
    const timerIsActive = timeRemaining >  0 && timeRemaining <targetTime *1000;
    
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime *1000);
    }

    function handleStart(){
        timer.current =setInterval(()=>{
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining-100)
        } ,100);
        
    }
   
 
    function handleStop(){
        clearTimeout(timer.current);
        dialog.current.open();
    }
    return (
        <>
        <ResultModal 
        ref={dialog}  
        targetTime={targetTime} 
        remainingTime={timeRemaining}
        onReset={handleReset}
        ></ResultModal>

        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second {targetTime > 1? '': ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop :handleStart}>
                   {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>

            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'} 
            </p>
        </section>
        </>
    );
};
