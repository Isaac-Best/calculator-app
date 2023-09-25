import {ACTIONS, calculatorAction} from "../../reducers/form-reducer";
import "../../app.css";

interface ClearButtonProps {
    dispatch: React.Dispatch<calculatorAction>;
    clear: string;
}


export default function ClearButton({dispatch, clear}: ClearButtonProps) {
    return (
        <button className="operator-button" onClick={() => dispatch({type: ACTIONS.CLEAR})}>
            {clear}
        </button>)
};