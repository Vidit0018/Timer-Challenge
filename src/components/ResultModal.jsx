import { forwardRef ,useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';


 const ResultModal = forwardRef(function ResultModal(
  {targetTime,remainingTime,onReset},ref) {
  const dialog =useRef();
  let userLost ;
  if(remainingTime <=0){
    userLost=true;
  }
  else{
    userLost=false;
  }
  const score =Math.round((targetTime-(remainingTime/1000))*100);

  useImperativeHandle(ref,()=>{
    return {
      open(){
          dialog.current.showModal();
      }
    }
  })
  
  return createPortal(  <dialog ref={dialog} className="result-modal"  onClose={onReset} >
    {userLost && <h2>Your LOST </h2>}
    {!userLost && <h2>Your Score : {score} </h2>}
    <p>Target Time was <strong>{targetTime}</strong></p>
    {!userLost &&
    <>
    <p>You Stopped it in <strong>{remainingTime/1000}</strong></p>
    </>}
    <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
    </form>
  </dialog>, document.getElementById('modal'));
})
export default ResultModal;
