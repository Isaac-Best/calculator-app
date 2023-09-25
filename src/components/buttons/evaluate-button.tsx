import {ACTIONS, calculatorAction} from "../../reducers/form-reducer";
import "../../app.css";

interface EvaluateButtonProps {
    dispatch: React.Dispatch<calculatorAction>;
    evaluate: string;
}


export default function EvaluateButton({dispatch, evaluate}: EvaluateButtonProps) {
    return (
        <button className="operator-button" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>
            {evaluate}
        </button>
        )
};