
import { ACTIONS } from "./App";
const Operation = ({operation,dispatch}) => {
    return (
        <button  onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>
            {operation}
        </button>
      );
}
 
export default Operation;