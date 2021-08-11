import React from 'react';
import {Redirect, Route} from 'react-router-dom';


 const PrivateRotue = ({component: Component, ...rest}) =>{

    return <Route {...rest} component={(props) =>{
    //  check token is present 
    const token = window.localStorage.getItem('token');
      if(token){
          return <Component {...props}/>
      }else{
          return <Redirect to={`/signin`}/>
      }
    }} />
}
export default PrivateRotue;