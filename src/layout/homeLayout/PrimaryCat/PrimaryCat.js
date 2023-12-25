import React, {useEffect, useState} from "react";
import {Container, Nav} from "react-bootstrap";
import styles from "./PrimaryCat.module.css";
import "./PrimaryCat.css";
import {useSelector} from "react-redux";
import PrimaryCatSingle from "./PrimaryCatSingle";
import {useHistory} from "react-router";

function PrimaryCat({scrollState}) {
	const history = useHistory();
	const category = useSelector(state => state.category);
	const auth = useSelector(state => state.auth);
	const handleClick = slug => {
		history.push(`/categories/${slug}`);
	};

	const [isHome, setisHome] = useState(false);
	useEffect(() => {
		if (window.location.pathname === "/") {
			setisHome(true);
		} else {
			setisHome(false);
		}
	}, [isHome]);

	return (
		<div
			className={`${
				auth.isAuthenticated === false && isHome === true
					? scrollState !== "active"
						? styles.hide
						: "position-fixed"
					: ""
			} ${styles.parent}`}
		>
			<Container className='pl-4 pr-4'>
				<Nav
					className={` 
                                    ${styles.parentCat}
                                    ${
																			auth.isAuthenticated === false &&
																			isHome === true
																				? scrollState !== "active"
																					? styles.hide
																					: ""
																				: ""
																		}
                                    `}
					activeKey='/home'
					onSelect={handleClick}
				>
					{category &&
						category.data &&
						category.data.slice(0, 8).map(cat => {
							return (
								<PrimaryCatSingle
									handleClick={handleClick}
									key={cat.id}
									cat={cat}
								/>
							);
						})}
				</Nav>
			</Container>
		</div>
	);
}

export default PrimaryCat;
