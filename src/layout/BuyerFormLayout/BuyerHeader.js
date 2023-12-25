import React from 'react'
import { Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router';
import  Logo  from '../../images/logo_d.png'

function BuyerHeader() {
     const history = useHistory();
     const handleRoute = (e) => {
         e.preventDefault();
       history.push("/");
     };
  
    return (
        <>
        <Navbar bg="light">
            <Navbar.Brand onClick={handleRoute}>
                <img src={Logo} alt="Fucha Logo" />
            </Navbar.Brand>
        </Navbar>  
        </>
    )
}

export default BuyerHeader
