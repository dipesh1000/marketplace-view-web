import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import GigOverviewAdd from "../../../../components/Gig/GigOverviewForm/GigOverview";
import {
	fetchCategory,
	fetchSearchTag,
} from "../../../../components/Gig/GigOverviewForm/redux/Action";
import Styles from "./Gig.module.css";

function GigsOverview() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategory());
		dispatch(fetchSearchTag());
	}, [dispatch]);
	return (
		<div className={Styles.overview}>
			<Container>
				<Row>
					<Col sm={{offset: 1, span: 8}}>
						<GigOverviewAdd />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default GigsOverview;
