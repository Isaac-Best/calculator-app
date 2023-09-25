import Calculator from "./components/calculator/calculator";
import {Fragment} from 'react';
function App() {
  return (
  <Fragment>
    <ol>
      <li>keyboard inputs supports x and * for multiplication</li>
      <li>since I'm using event listener copy paste and arrow keys do not have function</li>
      <li>keyboard sign flipping is "s" for sign because + - defaults to addition / subtraction</li>
      <li>esc and backspace both clear all inputs</li>
      <li>Enter is =</li>
    </ol>
    <Calculator/>
  </Fragment>
  
  );
}


export default App;
