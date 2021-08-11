import React from 'react'
import { Container, Navbar,Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink,Link} from 'react-router-dom'
import { signout } from '../../actions/auth.action';


/**
* @author
* @function Header
**/

const Header = (props) => {
   const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
console.log("====> auth : ", auth)
  const logout = () => {
    dispatch(signout())
  }
  const nonLoggedUser = () =>{
    return (
      <Nav className="mr-right">
        <li className="nav-item">
         <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </li>
        <li className="nav-item">
         <NavLink to="/signin" className="nav-link">Signin</NavLink>
        </li>
     
    </Nav>
    )
  }
  const LoggedinUser = () => {
         return (
          <Nav className="mr-right">
           <li className="nav-item">
           <NavLink to={''} className="nav-link">{auth.user.firstName} {auth.user.lastName}</NavLink>
          </li>
          <li className="nav-item">
           <NavLink to="/signin" className="nav-link" onClick={logout}>Logout</NavLink>
          </li>
       
      </Nav>
         )
  }
  return(
    <React.Fragment>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Link to='/' className="navbar-brand">Messanger App</Link>
    {auth.authenticate ? LoggedinUser() : nonLoggedUser()}
    </Container>
  </Navbar>
    </React.Fragment>
   )

 }

export default Header