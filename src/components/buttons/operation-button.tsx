import {ACTIONS, calculatorAction} from "../../reducers/form-reducer";
import "../../app.css";

interface OperationButtonProps {
    dispatch: React.Dispatch<calculatorAction>;
    operation: string;
}


export default function OperationButton({dispatch, operation}: OperationButtonProps) {
    return (
        <button className="operator-button" onClick={() => dispatch({type: ACTIONS.OPERATION, payload: {operation: operation}})}>
            {operation}
        </button>)
};