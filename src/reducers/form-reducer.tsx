

// define type for state
export interface calculatorState {
    currentNum: string;
    previousNum: string | null;
    operation: string | null;
    hasEvaluated: boolean;
};

export const INITIAL_STATE: calculatorState = {
    currentNum: "",
    previousNum: null,
    operation: null,
    hasEvaluated: false,
};


// define globaly allowed action types 
export const ACTIONS = { 
    ADD_DIGIT: 'add-digit',
    OPERATION: 'operation',
    CLEAR: 'clear',
    EVALUATE: 'evaluate'

};

export type calculatorAction =
    | { type: typeof ACTIONS.ADD_DIGIT, payload: { digit: string } }
    | { type: typeof ACTIONS.OPERATION, payload: { operation: string } }
    | { type: typeof ACTIONS.CLEAR }
    | { type: typeof ACTIONS.EVALUATE, payload: { operation: string } }



function evaluate({currentNum, previousNum, operation} : calculatorState ){
    if (!previousNum || !currentNum || !operation) {
        throw new Error("Invalid state provided for evaluation");
    }
    const num1 = parseFloat(previousNum);
    const num2 = parseFloat(currentNum);
    let result: number | string; // in the event that its Error

    switch (operation){
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
        case "x":
            result = num1 * num2;
            break;
        case "/":
        case "÷" :
            if (num2 === 0) {
                result = "Error";
                break
            }
            result = num1 / num2;
            break;
        case "^":
            result = num1 ** num2;
            break;

        default:
            throw new Error("invalid evaluation sequence")

    }

    return result.toString()
}
    
  
export const calculatorReducer = (state: calculatorState, action: calculatorAction) => {
    switch (action.type){

        case ACTIONS.ADD_DIGIT:

            // type guard because there are options w/o payload so we check if there is a payload then check if the digit is in payload
            if ('payload' in action && 'digit' in action.payload){
                const { digit } = action.payload;
                
                // if we just used the = sign instead of adding a digit we start a new one
                if (state.hasEvaluated) {
                    return {
                        ...state,
                        currentNum: digit,
                        hasEvaluated: false
                    };
                }
                // check to not stack leading 0's
                if (action.payload.digit === "0" && state.currentNum === "0"){
                    return state
                }
                // check for multiple .
                if (action.payload.digit === "." && state.currentNum.includes(".")){
                    return state
                }
                return {
                    ...state,
                    currentNum: `${state.currentNum || ""}${digit}`
                }

            }
            else {
                throw new Error("Invalid ADD_DIGIT")
            }

            
        case ACTIONS.CLEAR:
            return INITIAL_STATE;

        case ACTIONS.OPERATION:
            // if no num input do nothing, checking falsy not null bc can be ""
            if (!state.currentNum  && !state.previousNum ){
                return state
            }

            // type check 
            if ('payload' in action && 'operation' in action.payload){
                const operationType = action.payload.operation;

                // Handle the +/- operation to flip the sign
                if (operationType === "+/-" || operationType ==="s"){
                    if (state.currentNum) {
                        // Negate the current number and return the updated state
                        return {
                            ...state,
                            currentNum: (-parseFloat(state.currentNum)).toString()
                        };
                    }
                    return state;
                }

                // if no prev input set current to prev
                if (state.previousNum === null){
                    return {
                        ...state,
                        previousNum: state.currentNum,
                        operation: action.payload.operation,
                        currentNum: "" 
                    }
                }

                // If both currentNum and previousNum exist, and we input another operation -> keep the total running 
                if (state.currentNum && state.previousNum && state.operation) {
                    const result = evaluate(state); 
                    return {
                        ...state,
                        previousNum: result,          
                        operation: action.payload.operation,
                        currentNum: ""
                    };
                } 
            };

            return state;

        case ACTIONS.EVALUATE:
            if (state.currentNum && state.previousNum && state.operation){
                return {
                    ...state,
                    previousNum: null,
                    operation: null,
                    currentNum: evaluate(state),
                    hasEvaluated: true
                }
            }
            // not a valid input just return
            else{
                return state
            }

        default:
            throw new Error("case unaccounted for");
    }
};




const calculatorModule = {
    ACTIONS,
    INITIAL_STATE,
    calculatorReducer,
};

export default calculatorModule;
