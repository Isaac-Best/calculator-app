import "../../app.css";
import { useReducer, useEffect} from 'react';
import formReducer from '../../reducers/form-reducer'; 
import DigitButton from "../../components/buttons/digit-button";
import OperationButton from "../../components/buttons/operation-button";
import ClearButton from "../../components/buttons/clear-button";
import EvaluateButton from "../../components/buttons/evaluate-button";

function Calculator() {
  const [state, dispatch] = useReducer(formReducer.calculatorReducer, formReducer.INITIAL_STATE);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      if((e.key >= '0' && e.key <= '9') || e.key === ".") {
        dispatch({type: formReducer.ACTIONS.ADD_DIGIT, payload: { digit: e.key }}); 
      }
      if(['+', '-', 'x', '/', '^', 's', '*'].includes(e.key)) {
        dispatch({type: formReducer.ACTIONS.OPERATION, payload: { operation: e.key }});
      }
      if(e.key === 'Backspace' || e.key ==="Escape") {
        dispatch({type: formReducer.ACTIONS.CLEAR});
      }
      if(e.key === 'Enter') {
        e.preventDefault();
        dispatch({type: formReducer.ACTIONS.EVALUATE});
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [dispatch]);
  

  return (
    <div className="main">
      <section className="calculator-body">
        <input type="text" value={state.currentNum} id="calculator-input" />
        <div>
          <ClearButton clear="AC" dispatch={dispatch}/> 
          <OperationButton operation="+/-" dispatch={dispatch} />
          <OperationButton operation="^" dispatch={dispatch} />
          <OperationButton operation="&#247;" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="x" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="0" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <EvaluateButton evaluate="=" dispatch={dispatch} />
        </div>
      </section>
    </div>
  );
}

export default Calculator;
