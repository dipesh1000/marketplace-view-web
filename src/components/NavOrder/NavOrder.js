import React, {useState} from "react";
import "./styles/Style.scss";
import {NavLink} from "react-router-dom";
import { useSelector } from "react-redux";

function NavOrder() {
  const { user } = useSelector((state) => state.auth);
	const [navState, setNavState] = useState(false);

	return (
    <div className="NavOrderWrapper">
      {user?.role === "seller" ?
      <NavLink to="/users/seller_dashboard/orders">
        <div className="orderTitle" onClick={() => setNavState(!navState)}>
          Orders
        </div>
      </NavLink>
			:
			<NavLink to="/users/dashboard/orders">
        <div className="orderTitle" onClick={() => setNavState(!navState)}>
          Orders
        </div>
      </NavLink>
			
			}
      {/* {navState === true && (
				<div className='nav-dropdown-item'>
					<NavOrderContainer />
				</div>
			)} */}
    </div>
  );
}

export default NavOrder;
