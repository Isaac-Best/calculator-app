import {ACTIONS, calculatorAction} from "../../reducers/form-reducer";
import "../../app.css";

interface DigitButtonProps {
    dispatch: React.Dispatch<calculatorAction>;
    digit: string;
}


export default function DigitButton({dispatch, digit}: DigitButtonProps) {
    // mimicking the iphone calculator the 0 spans 2 
    const buttonClassName = digit === '0' ? 'span-two-button' : 'calculator-button'; 

    return (
        <button 
        className={buttonClassName}
        onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: digit}})}>
            {digit}
        </button>)
};