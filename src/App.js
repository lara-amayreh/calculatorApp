import './App.css';
import Operation from './Operation';
import DigitButton from './DigitButton'
import {useReducer} from 'react';
export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-opperation',
  CLEAR:'clear',
  DELETE_DEGIT:'delete-degit',
  EVALUATE :'evaluate'
}
 function reducer(state,{type,payload}){
    switch (type){
      case ACTIONS.ADD_DIGIT:
        if(payload.digit === '.' && state.curOperand.includes("."))
        return state;
        if( state.curOperand == '0' && payload.digit == '0')
         return state;
         if(state.evalflag == true)
         return{
          ...state,
          curOperand:payload.digit,
          evalflag:false
         }
        return {
          ...state,curOperand:`${state.curOperand || ""}${payload.digit}`
        }
        case ACTIONS.CHOOSE_OPERATION:
          if(state.curOperand == null && state.preOperand == null)
          return state;
          if(state.preOperand == null )
          return{
            ...state,
            preOperand:state.curOperand,
            operation:payload.operation,
             curOperand:null,

          }
          if(state.curOperand == null)
          return{
            ...state,
            operation:payload.operation,
            
          }
          return{
            ...state,
            preOperand:evaluate(state.curOperand,state.preOperand,state.operation),
            curOperand:null  ,   
             operation:payload.operation,

          }
          case ACTIONS.CLEAR:
            return{
              
            }
            case ACTIONS.DELETE_DEGIT:
              if(state.curOperand == null)
              return state;
              return{ ...state,curOperand:state.curOperand.slice(0,-1)
            }
            case ACTIONS.EVALUATE:
              if (state.preOperand == null || state.curOperand == null || state.operation == null)
              return state;
              return{
                ...state,
                curOperand:evaluate(state.curOperand,state.preOperand,state.operation),
                preOperand:null  ,   
                 operation:null,
                 evalflag:true,
                
              }
              

    }}
function evaluate(pre,cur,op){
  if (isNaN(pre)|| isNaN(cur)|| op == '')
  return '';
 switch (op){
  case '+':
    return parseFloat(pre) + parseFloat(cur);
    
 
 case '-':
  return parseFloat(pre) - parseFloat(cur);
  
  case '*':
    return parseFloat(pre) * parseFloat(cur);
    
    case '/':
      return parseFloat(pre) / parseFloat(cur);
      
   }
 }


function App() {


  const [{curOperand,preOperand,operation},dispatch]=useReducer(reducer,{});
 
  return (
    <div className="container">
    <div className="App">
      <div className="output">
        <div className="pre-op">{preOperand} {operation}</div>
        <div className="c-op">{curOperand}</div>
      </div>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DEGIT})} className='s-2'>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.CLEAR})}>DEL</button>
      <Operation operation={'+'} dispatch={dispatch}>+</Operation>    
      <DigitButton digit={'1'} dispatch={dispatch}>1</DigitButton>
      <DigitButton digit={'2'} dispatch={dispatch}>2</DigitButton>
      <DigitButton digit={'3'} dispatch={dispatch}>3</DigitButton>
      <Operation operation={'*'} dispatch={dispatch}>*</Operation>    
      <DigitButton digit={'4'} dispatch={dispatch}>4</DigitButton>
      <DigitButton digit={'5'} dispatch={dispatch}>5</DigitButton>
      <DigitButton digit={'6'} dispatch={dispatch}>6</DigitButton>
<Operation operation={'/'} dispatch={dispatch}>/</Operation>    
  <DigitButton digit={'7'} dispatch={dispatch}>7</DigitButton>
      <DigitButton digit={'8'} dispatch={dispatch}>8</DigitButton>
      <DigitButton digit={'9'} dispatch={dispatch}>9</DigitButton>
      <Operation operation={'-'} dispatch={dispatch}>-</Operation>    
      <DigitButton digit={'.'} dispatch={dispatch}>.</DigitButton>
      <DigitButton digit={'0'} dispatch={dispatch}>0</DigitButton>
<button onClick={()=>dispatch({type:ACTIONS.EVALUATE})} className='s-2'>=</button>    </div></div>
  );
}

export default App;
