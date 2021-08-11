import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../Header'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <React.Fragment>
        <Header/>
      
       {props.children}
       
    </React.Fragment>
   )

 }

export default Layout