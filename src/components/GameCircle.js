import React from "react";
import './game.css'


const GameCircle = ({ id, children, className, oncircleClicked }) => {
    // const onClick = (id, ev) => { //arrow function
    //     //  debugger;
    //     oncircleClicked(id)
    //     // alert('On click ' + id); //passing parameter by value from onclick func()
    // }
    return (
        //Dynamic style
        // <div className={`gameCircle ${id % 2 === 0 ? 'odd' : 'even'}`} onClick={() => oncircleClicked(id)} >
        //     {children}
        // </div >
        <div className={`gameCircle ${className}`} onClick={() => oncircleClicked(id)} >
            {children}
        </div >
    )
}
export default GameCircle