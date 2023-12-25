import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import GigBreadCrumb from "../../../../components/Gig/BreadCrumb/BreadCrumb";
import GigOverviewEdit from "../../../../components/Gig/GigOverviewForm/GigOverviewEdit";
import {
	fetchCategory,
	fetchSearchTag,
} from "../../../../components/Gig/GigOverviewForm/redux/Action";
import Styles from "./Gig.module.css";

function GigsOverviewEdit() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategory());
		dispatch(fetchSearchTag());
	}, [dispatch]);
	return (
		<>
			<GigBreadCrumb />

			<div className={Styles.overview}>
				<Container>
					<Row>
						<Col sm={{offset: 1, span: 8}}>
							<GigOverviewEdit />
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default GigsOverviewEdit;
