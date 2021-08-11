
import './App.css';
import {Route ,Switch} from 'react-router-dom'
import Home from './container/Home';
import Signup from './container/Signup';
import Signin from './container/Signin';
import  PrivateRotue  from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { isUserLogin } from './actions/auth.action';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLogin());
    }
},[]);

  return (
    <div className="App">
     
       <Switch>
       <PrivateRotue exact path="/" component={Home}/> 
       <Route path="/signup" component={Signup}/> 
       <Route path="/signin" component={Signin}/> 
       </Switch>
    
    </div>
  );
}

export default App;
