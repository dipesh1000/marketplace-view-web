import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {BiSearch} from "react-icons/bi";
import {useHistory} from "react-router-dom";
import styles from "./MainSearch.module.css";
import SearchResults from "../Search/SearchResults";

function MainSearch() {
	const history = useHistory();
	const [searchWord, setSearchWord] = useState("");
	const [searchDiv, setSearchDiv] = useState(false);
	const searchLength = localStorage.getItem("search");
	let mainSearch = true;
	const handleSearch = e => {
		setSearchWord(e.target.value);
		setSearchDiv(true);
		!searchLength && !e.target.value && setSearchDiv(false);
	};

	const handleKeyPress = e => {
		e.preventDefault();
		setSearchDiv(false);
		history.push(`/search/${searchWord}`);
		var existing = localStorage.getItem("search");
		existing = existing ? existing.split(",") : [];
		existing.push(searchWord);
		localStorage.setItem("search", existing.toString());
	};
	return (
		<>
			<div className={styles.mainSearchWrapper}>
				<div className={styles.mainSearchContainer}>
					<h1>
						Find the perfect <i>freelance</i> services for your business
					</h1>
					<Form onSubmit={handleKeyPress}>
						<Form.Group
							className={styles.formGroup}
							style={{position: "relative", marginBottom: "1rem"}}
						>
							<Form.Control
								size='lg'
								type='text'
								value={searchWord}
								placeholder='Try "Building Mobile App"'
								className={styles.searchInput}
								onChange={handleSearch}
								onClick={() => searchLength && setSearchDiv(true)}
							/>
							<SearchResults
								searchWord={searchWord}
								setSearchWord={setSearchWord}
								searchDiv={searchDiv}
								setSearchDiv={setSearchDiv}
								mainSearch={mainSearch}
							/>
							<BiSearch className={styles.searchIcon} />
							{searchWord && (
								<i
									className={`fas fa-times ${styles.cancelIcon}`}
									onClick={() => setSearchWord("")}
								></i>
							)}
							<Button className={styles.searchButton} type='submit'>
								Search
							</Button>
						</Form.Group>
					</Form>
					<div className={styles.popularTags}>
						<ul>
							<li>Popular:</li>
							<li>Web and Mobile Design</li>
							<li>Wordpress</li>
							<li>Logo Design</li>
							<li>Drop Shipping</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default MainSearch;
